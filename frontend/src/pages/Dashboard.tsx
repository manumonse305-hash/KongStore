import React, { useEffect, useState } from 'react';
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
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import{} from '../styles/Dashboard.css';

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

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [productos, setProductos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);
      try {
        const [dashboard, productosData] = await Promise.all([
          api.get('/estadisticas/dashboard'),
          api.get('/productos'),
        ]);
        setDashboardData(dashboard.data);
        setProductos(productosData.data.slice(0, 6));
      } catch (error) {
        console.error('Error cargando dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, []);

  

  const formatNumber = (value: any): string => {
    if (value === undefined || value === null) return '0.00';
    const num = typeof value === 'string' ? parseFloat(value) : Number(value);
    return isNaN(num) ? '0.00' : num.toFixed(2);
  };

  const getStockClass = (stock: number, stockMinimo: number) => {
    return stock <= stockMinimo ? 'dashboard-stock-bajo' : 'dashboard-stock-normal';
  };

const getProductImage = (nombre: string) => {
  const imgStyle = {
    width: '200px',
    height: '200px',
    objectFit: 'contain' as const,
  };

  const nombreLower = nombre.toLowerCase();

  if (nombreLower.includes('edición digital')) {
    return (
      <img
        src="/xbox.avif"
        alt={nombre}
        style={imgStyle}
      />
    );
  }

  if (nombreLower.includes('con lector')) {
    return (
      <img
        src="/lector.jpg"
        alt={nombre}
        style={imgStyle}
      />
    );
  }

  if (nombreLower.includes('pro')) {
    return (
      <img
        src="/imagespro.jpg"
        alt={nombre}
        style={imgStyle}
      />
    );
  }

  if (nombreLower.includes('slim')) {
    return (
      <img
        src="/images.jpg"
        alt={nombre}
        style={imgStyle}
      />
    );
  }

  if (nombreLower.includes('portal')) {
    return (
      <img
        src="/portal_.jpg"
        alt={nombre}
        style={imgStyle}
      />
    );
  }

  if (nombreLower.includes('dualsense')) {
    return (
      <img
        src="/450_1000.webp"
        alt={nombre}
        style={imgStyle}
      />
    );
  }

  return <span style={{ fontSize: '48px' }}></span>;
}; 


  if (loading) {
    return <div className="dashboard-loading">Cargando dashboard...</div>;
  }

  return (
    <div className="dashboard-container">
      {/* Sección de Bienvenida con Logo */}
      <div className="dashboard-welcome">
        <div className="dashboard-welcome-content">
          <h1>¡Bienvenido, {user}!</h1>
          <p>Bienvenido al sistema de gestión de Kong Store</p>
        </div>
        <div className="dashboard-logo">
          <div className="dashboard-logo-icon">
            <img 
              src="/logo.png" 
              width="80px" 
              height="80px"
              alt="Logo Kong Store" 
              style={{ objectFit: 'contain' }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <h2>Kong Store</h2>
        </div>
      </div>

      {/* Tarjetas de resumen */}
      {dashboardData && (
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <div className="dashboard-card-icon">💰</div>
            <h3>Total Ventas</h3>
            <p className="dashboard-card-value">Bs {formatNumber(dashboardData.resumen.totalVentas)}</p>
          </div>
          <div className="dashboard-card">
            <div className="dashboard-card-icon">📦</div>
            <h3>Total Productos</h3>
            <p className="dashboard-card-value">{dashboardData.resumen.totalProductos}</p>
          </div>
          <div className="dashboard-card">
            <div className="dashboard-card-icon">📈</div>
            <h3>Ganancia Total</h3>
            <p className="dashboard-card-value">Bs {formatNumber(dashboardData.resumen.gananciaTotal)}</p>
          </div>
        </div>
      )}

      {/* Productos Destacados */}
      <h2 className="dashboard-section-title">📦 Productos Destacados</h2>
      <div className="dashboard-products-grid">
        {productos.map((prod) => (
          <div key={prod.idProducto} className="dashboard-product-card">
            <div className="dashboard-product-icon">
              {getProductImage(prod.nombre)}
            </div>
            <div className="dashboard-product-info">
              <div className="dashboard-product-name">{prod.nombre}</div>
              <div className="dashboard-product-price">Bs {formatNumber(prod.precio_venta)}</div>
              <div className="dashboard-product-stock">
                Stock: <span className={getStockClass(prod.stock, prod.stock_minimo)}>{prod.stock}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;