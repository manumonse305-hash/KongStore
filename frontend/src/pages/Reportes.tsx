import React, { useState } from 'react';
import { reportesService, descargarPDF } from '../services/reportes.service';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import api from '../services/api';
import {  } from "../styles/Reportes.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

const Reportes: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [cargandoGraficos, setCargandoGraficos] = useState(false);

  const cargarGraficos = async () => {
    setCargandoGraficos(true);
    try {
      const response = await api.get('/estadisticas/dashboard');
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error cargando gráficos:', error);
    } finally {
      setCargandoGraficos(false);
    }
  };

  React.useEffect(() => {
    cargarGraficos();
  }, []);

  const descargarVentasDia = async () => {
    setLoading(true);
    try {
      const blob = await reportesService.getVentasDiaPDF();
      descargarPDF(blob, `ventas-dia-${new Date().toISOString().split('T')[0]}`);
    } catch (error) {
      console.error('Error descargando reporte:', error);
      alert('Error al generar el reporte');
    } finally {
      setLoading(false);
    }
  };

  const descargarStockBajo = async () => {
    setLoading(true);
    try {
      const blob = await reportesService.getStockBajoPDF();
      descargarPDF(blob, `stock-bajo-${new Date().toISOString().split('T')[0]}`);
    } catch (error) {
      console.error('Error descargando reporte:', error);
      alert('Error al generar el reporte');
    } finally {
      setLoading(false);
    }
  };

  const descargarTotalVendido = async () => {
    if (!fechaInicio || !fechaFin) {
      alert('Seleccione un rango de fechas');
      return;
    }
    setLoading(true);
    try {
      const blob = await reportesService.getTotalVendidoPDF(fechaInicio, fechaFin);
      descargarPDF(blob, `total-vendido-${fechaInicio}-a-${fechaFin}`);
    } catch (error) {
      console.error('Error descargando reporte:', error);
      alert('Error al generar el reporte');
    } finally {
      setLoading(false);
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const formatNumber = (value: any): string => {
    if (value === undefined || value === null) return '0.00';
    const num = typeof value === 'string' ? parseFloat(value) : Number(value);
    return isNaN(num) ? '0.00' : num.toFixed(2);
  };

  return (
    <div className="reportes-container">
      <h1 className="reportes-title">Reportes y Estadísticas</h1>

      <div className="reportes-section">
        <h2>Reportes PDF</h2>
        <div className="reportes-card-grid">
          <div className="reportes-card">
            <h3>📊 Ventas del Día</h3>
            <p>Reporte de todas las ventas realizadas hoy</p>
            <button onClick={descargarVentasDia} disabled={loading} className="reportes-btn-pdf">
              {loading ? 'Generando...' : 'Descargar PDF'}
            </button>
          </div>

          <div className="reportes-card">
            <h3>⚠️ Stock Bajo</h3>
            <p>Productos con stock por debajo del mínimo</p>
            <button onClick={descargarStockBajo} disabled={loading} className="reportes-btn-pdf">
              {loading ? 'Generando...' : 'Descargar PDF'}
            </button>
          </div>

          <div className="reportes-card">
            <h3>💰 Total Vendido</h3>
            <p>Productos más vendidos en un período</p>
            <div className="reportes-date-range">
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="reportes-date-input"
              />
              <span>a</span>
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className="reportes-date-input"
              />
            </div>
            <button onClick={descargarTotalVendido} disabled={loading} className="reportes-btn-pdf">
              {loading ? 'Generando...' : 'Descargar PDF'}
            </button>
          </div>
        </div>
      </div>

      <div className="reportes-section">
        <h2>Gráficos Estadísticos</h2>
        
        {cargandoGraficos ? (
          <div className="reportes-loading">Cargando gráficos...</div>
        ) : dashboardData ? (
          <div className="reportes-charts-container">
            <div className="reportes-chart-card">
              <h3>Ventas por Día de la Semana</h3>
              <Bar data={dashboardData.graficos.ventasPorDia} options={options} />
            </div>

            <div className="reportes-chart-card">
              <h3>Top 5 Productos Más Vendidos</h3>
              <Pie data={dashboardData.graficos.topProductos} options={options} />
            </div>

            <div className="reportes-chart-card">
              <h3>Ventas por Mes</h3>
              <Line data={dashboardData.graficos.ventasPorMes} options={options} />
            </div>

            <div className="reportes-chart-card">
              <h3>Estado del Inventario</h3>
              <Pie data={dashboardData.graficos.stockBajo} options={options} />
            </div>
          </div>
        ) : (
          <div className="reportes-loading">No se pudieron cargar los gráficos</div>
        )}
      </div>

      {dashboardData && (
        <div className="reportes-section">
          <h2>Resumen General</h2>
          <div className="reportes-summary-grid">
            <div className="reportes-summary-card">
              <h3>💰 Total Ventas</h3>
              <p className="reportes-summary-value">Bs {formatNumber(dashboardData.resumen.totalVentas)}</p>
            </div>
            <div className="reportes-summary-card">
              <h3>📦 Total Productos</h3>
              <p className="reportes-summary-value">{dashboardData.resumen.totalProductos}</p>
            </div>
            <div className="reportes-summary-card">
              <h3>📈 Ganancia Total</h3>
              <p className="reportes-summary-value">Bs {formatNumber(dashboardData.resumen.gananciaTotal)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reportes;