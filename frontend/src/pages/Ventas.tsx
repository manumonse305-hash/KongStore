import React, { useState, useEffect } from 'react';
import { ventasService, type Venta } from '../services/ventas.service';
import { productosService, type Producto } from '../services/productos.service';
import {  } from "../styles/Ventas.css";

const Ventas: React.FC = () => {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [verDetallesOpen, setVerDetallesOpen] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState<Venta | null>(null);
  
  const [detalles, setDetalles] = useState<{ productoId: number; cantidad: number; precioUnitario: number }[]>([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState<number>(0);
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState<number>(1);
  const [precioSeleccionado, setPrecioSeleccionado] = useState<number>(0);
  const [error, setError] = useState('');

  const formatNumber = (value: any): string => {
    if (value === undefined || value === null) return '0.00';
    const num = typeof value === 'string' ? parseFloat(value) : Number(value);
    return isNaN(num) ? '0.00' : num.toFixed(2);
  };

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const [ventasData, productosData] = await Promise.all([
        ventasService.getAll(),
        productosService.getAll(),
      ]);
      setVentas(ventasData);
      setProductos(productosData.filter(p => p.activo && p.stock > 0));
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const abrirModalVenta = () => {
    setDetalles([]);
    setProductoSeleccionado(0);
    setCantidadSeleccionada(1);
    setPrecioSeleccionado(0);
    setError('');
    setModalOpen(true);
  };

  const abrirDetalles = (venta: Venta) => {
    setVentaSeleccionada(venta);
    setVerDetallesOpen(true);
  };

  const getProductoInfo = (productoId: number) => {
    const prod = productos.find(p => p.idProducto === productoId);
    return prod ? `#${prod.idProducto} - ${prod.nombre}` : `#${productoId} - Producto no encontrado`;
  };

  const agregarProducto = () => {
    const prodId = Number(productoSeleccionado);
    const cantidad = Number(cantidadSeleccionada);
    const precio = Number(precioSeleccionado);
    
    if (prodId === 0) {
      setError('Seleccione un producto');
      return;
    }
    if (cantidad <= 0) {
      setError('La cantidad debe ser mayor a 0');
      return;
    }
    if (precio <= 0) {
      setError('El precio debe ser mayor a 0');
      return;
    }

    const producto = productos.find(p => p.idProducto === prodId);
    if (!producto) return;

    if (cantidad > producto.stock) {
      setError(`Stock insuficiente. Solo hay ${producto.stock} unidades`);
      return;
    }

    const nuevoDetalle = {
      productoId: prodId,
      cantidad: cantidad,
      precioUnitario: precio,
    };

    setDetalles([...detalles, nuevoDetalle]);
    setProductoSeleccionado(0);
    setCantidadSeleccionada(1);
    setPrecioSeleccionado(0);
    setError('');
  };

  const eliminarDetalle = (index: number) => {
    const nuevosDetalles = [...detalles];
    nuevosDetalles.splice(index, 1);
    setDetalles(nuevosDetalles);
  };

  const guardarVenta = async () => {
    if (detalles.length === 0) {
      setError('Debe agregar al menos un producto');
      return;
    }

    setError('');
    try {
      const detallesConvertidos = detalles.map(d => ({
        productoId: Number(d.productoId),
        cantidad: Number(d.cantidad),
        precioUnitario: Number(d.precioUnitario),
      }));
      
      await ventasService.create(detallesConvertidos);
      setModalOpen(false);
      cargarDatos();
    } catch (error: any) {
      console.error('Error:', error.response?.data);
      setError(error.response?.data?.message || 'Error al registrar venta');
    }
  };

  const totalVenta = detalles.reduce((sum, d) => sum + (d.cantidad * d.precioUnitario), 0);

  return (
    <div className="ventas-container">
      <div className="ventas-header">
        <h1>Ventas</h1>
        <button onClick={abrirModalVenta} className="ventas-btn-primary">
          + Nueva Venta
        </button>
      </div>

      {loading ? (
        <div className="ventas-loading">Cargando...</div>
      ) : (
        <table className="ventas-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Vendedor</th>
              <th>Total</th>
              <th>Ganancia</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta) => (
              <tr key={venta.id}>
                <td>{venta.id}</td>
                <td>{new Date(venta.fechaVenta).toLocaleString()}</td>
                <td>{venta.usuario?.usuario || 'N/A'}</td>
                <td>Bs {formatNumber(venta.total)}</td>
                <td>Bs {formatNumber(venta.ganancia)}</td>
                <td>
                  <button onClick={() => abrirDetalles(venta)} className="ventas-btn-view">
                    Ver Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalOpen && (
        <div className="ventas-modal-overlay">
          <div className="ventas-modal-large">
            <h2>Nueva Venta</h2>
            {error && <p className="ventas-error">{error}</p>}

            <div className="ventas-form-group">
              <label>Agregar Producto</label>
              <div className="ventas-row">
                <select
                  value={productoSeleccionado}
                  onChange={(e) => {
                    const prodId = Number(e.target.value);
                    setProductoSeleccionado(prodId);
                    const prod = productos.find(p => p.idProducto === prodId);
                    if (prod) {
                      setPrecioSeleccionado(prod.precio_venta);
                    }
                  }}
                  className="ventas-select"
                >
                  <option value={0}>Seleccione un producto</option>
                  {productos.map((p) => (
                    <option key={p.idProducto} value={p.idProducto}>
                      #{p.idProducto} - {p.nombre} | Stock: {p.stock} | Bs {p.precio_venta}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Cantidad"
                  value={cantidadSeleccionada}
                  onChange={(e) => setCantidadSeleccionada(Number(e.target.value))}
                  className="ventas-input-small"
                />
                <input
                  type="number"
                  placeholder="Precio"
                  step="0.01"
                  value={precioSeleccionado}
                  onChange={(e) => setPrecioSeleccionado(Number(e.target.value))}
                  className="ventas-input-small"
                />
                <button onClick={agregarProducto} className="ventas-btn-add">
                  Agregar
                </button>
              </div>
            </div>

            <table className="ventas-table-small">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Unit.</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {detalles.map((det, idx) => (
                  <tr key={idx}>
                    <td>{getProductoInfo(det.productoId)}</td>
                    <td>{det.cantidad}</td>
                    <td>Bs {formatNumber(det.precioUnitario)}</td>
                    <td>Bs {formatNumber(det.cantidad * det.precioUnitario)}</td>
                    <td>
                      <button onClick={() => eliminarDetalle(idx)} className="ventas-btn-delete-small">
                        ❌
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="ventas-total-container">
              <strong>Total: Bs {formatNumber(totalVenta)}</strong>
            </div>

            <div className="ventas-modal-buttons">
              <button onClick={() => setModalOpen(false)} className="ventas-btn-cancel">
                Cancelar
              </button>
              <button onClick={guardarVenta} className="ventas-btn-save">
                Registrar Venta
              </button>
            </div>
          </div>
        </div>
      )}

      {verDetallesOpen && ventaSeleccionada && (
        <div className="ventas-modal-overlay">
          <div className="ventas-modal">
            <h2>Detalles de Venta #{ventaSeleccionada.id}</h2>
            <p><strong>Fecha:</strong> {new Date(ventaSeleccionada.fechaVenta).toLocaleString()}</p>
            <p><strong>Vendedor:</strong> {ventaSeleccionada.usuario?.usuario || 'N/A'}</p>
            <p><strong>Total:</strong> Bs {formatNumber(ventaSeleccionada.total)}</p>
            <p><strong>Ganancia:</strong> Bs {formatNumber(ventaSeleccionada.ganancia)}</p>

            <h3 className="ventas-subtitle">Productos</h3>
            <table className="ventas-table-small">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Unit.</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {ventaSeleccionada.detalles?.map((det) => (
                  <tr key={det.id}>
                    <td>
                      {det.producto 
                        ? `#${det.producto.idProducto} - ${det.producto.nombre}` 
                        : `#${det.productoId} - Producto no encontrado`}
                    </td>
                    <td>{det.cantidad}</td>
                    <td>Bs {formatNumber(det.precioUnitario)}</td>
                    <td>Bs {formatNumber(det.subtotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="ventas-modal-buttons">
              <button onClick={() => setVerDetallesOpen(false)} className="ventas-btn-cancel">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ventas;