import React, { useState, useEffect } from 'react';
import { comprasService, type Compra } from '../services/compras.service';
import { productosService, type Producto } from '../services/productos.service';
import { proveedoresService, type Proveedor } from '../services/proveedores.service';
import {} from '../styles/Compras.css'

const Compras: React.FC = () => {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [verDetallesOpen, setVerDetallesOpen] = useState(false);
  const [compraSeleccionada, setCompraSeleccionada] = useState<Compra | null>(null);
  
  const [proveedorId, setProveedorId] = useState<number>(0);
  const [detalles, setDetalles] = useState<{ productoId: number; cantidad: number; costoUnitario: number }[]>([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState<number>(0);
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState<number>(1);
  const [costoSeleccionado, setCostoSeleccionado] = useState<number>(0);
  const [error, setError] = useState('');

  const formatNumber = (value: any): string => {
    if (value === undefined || value === null) return '0.00';
    const num = typeof value === 'string' ? parseFloat(value) : Number(value);
    return isNaN(num) ? '0.00' : num.toFixed(2);
  };

  const calcularTotalCompra = (compra: Compra): number => {
    if (compra.total && compra.total !== 0) return Number(compra.total);
    if (compra.detalles && compra.detalles.length > 0) {
      return compra.detalles.reduce((sum, det) => sum + Number(det.subtotal), 0);
    }
    return 0;
  };

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const [comprasData, productosData, proveedoresData] = await Promise.all([
        comprasService.getAll(),
        productosService.getAll(),
        proveedoresService.getAll(),
      ]);
      
      setCompras(comprasData);
      setProductos(productosData.filter(p => p.activo));
      setProveedores(proveedoresData.filter(p => p.activo));
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const abrirModalCompra = () => {
    setProveedorId(0);
    setDetalles([]);
    setProductoSeleccionado(0);
    setCantidadSeleccionada(1);
    setCostoSeleccionado(0);
    setError('');
    setModalOpen(true);
  };

  const abrirDetalles = (compra: Compra) => {
    setCompraSeleccionada(compra);
    setVerDetallesOpen(true);
  };

  const getProductoInfo = (productoId: number) => {
    const prod = productos.find(p => p.idProducto === productoId);
    return prod ? `#${prod.idProducto} - ${prod.nombre}` : `#${productoId} - Producto no encontrado`;
  };

  const agregarProducto = () => {
    if (productoSeleccionado === 0) {
      setError('Seleccione un producto');
      return;
    }
    if (cantidadSeleccionada <= 0) {
      setError('La cantidad debe ser mayor a 0');
      return;
    }
    if (costoSeleccionado <= 0) {
      setError('El costo unitario debe ser mayor a 0');
      return;
    }

    const nuevoDetalle = {
      productoId: productoSeleccionado,
      cantidad: cantidadSeleccionada,
      costoUnitario: costoSeleccionado,
    };

    setDetalles([...detalles, nuevoDetalle]);
    setProductoSeleccionado(0);
    setCantidadSeleccionada(1);
    setCostoSeleccionado(0);
    setError('');
  };

  const eliminarDetalle = (index: number) => {
    const nuevosDetalles = [...detalles];
    nuevosDetalles.splice(index, 1);
    setDetalles(nuevosDetalles);
  };

  const guardarCompra = async () => {
    if (proveedorId === 0) {
      setError('Seleccione un proveedor');
      return;
    }
    if (detalles.length === 0) {
      setError('Debe agregar al menos un producto');
      return;
    }

    setError('');
    try {
      await comprasService.create({
        proveedorId,
        detalles,
      });
      setModalOpen(false);
      cargarDatos();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error al registrar compra');
    }
  };

  const totalCompra = detalles.reduce((sum, d) => sum + (d.cantidad * d.costoUnitario), 0);

  return (
    <div className="compras-container">
      <div className="compras-header">
        <h1>Compras</h1>
        <button onClick={abrirModalCompra} className="compras-btn-primary">
          + Nueva Compra
        </button>
      </div>

      {loading ? (
        <div className="compras-loading">Cargando...</div>
      ) : (
        <table className="compras-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Proveedor</th>
              <th>Usuario</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {compras.map((compra) => (
              <tr key={compra.compraId}>
                <td>{compra.compraId}</td>
                <td>{new Date(compra.fechaCompra).toLocaleString()}</td>
                <td>{compra.proveedor?.nombre || `#${compra.proveedorId}`}</td>
                <td>{compra.usuario?.usuario || 'N/A'}</td>
                <td>Bs {formatNumber(calcularTotalCompra(compra))}</td>
                <td><button onClick={() => abrirDetalles(compra)} className="compras-btn-view">Ver Detalles</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalOpen && (
        <div className="compras-modal-overlay">
          <div className="compras-modal-large">
            <h2>Nueva Compra</h2>
            {error && <p className="compras-error">{error}</p>}

            <div className="compras-form-group">
              <label>Proveedor *</label>
              <select
                value={proveedorId}
                onChange={(e) => setProveedorId(Number(e.target.value))}
                className="compras-select"
              >
                <option value={0}>Seleccione un proveedor</option>
                {proveedores.map((p) => (
                  <option key={p.idProveedor} value={p.idProveedor}>
                    #{p.idProveedor} - {p.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="compras-form-group">
              <label>Agregar Producto</label>
              <div className="compras-row">
                <select
                  value={productoSeleccionado}
                  onChange={(e) => setProductoSeleccionado(Number(e.target.value))}
                  className="compras-select"
                >
                  <option value={0}>Seleccione un producto</option>
                  {productos.map((p) => (
                    <option key={p.idProducto} value={p.idProducto}>
                      #{p.idProducto} - {p.nombre} (Stock: {p.stock})
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Cantidad"
                  value={cantidadSeleccionada}
                  onChange={(e) => setCantidadSeleccionada(Number(e.target.value))}
                  className="compras-input-small"
                />
                <input
                  type="number"
                  placeholder="Costo Unitario"
                  step="0.01"
                  value={costoSeleccionado}
                  onChange={(e) => setCostoSeleccionado(Number(e.target.value))}
                  className="compras-input-small"
                />
                <button onClick={agregarProducto} className="compras-btn-add">
                  Agregar
                </button>
              </div>
            </div>

            <table className="compras-table-small">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Costo Unit.</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {detalles.map((det, idx) => (
                  <tr key={idx}>
                    <td>{getProductoInfo(det.productoId)}</td>
                    <td>{det.cantidad}</td>
                    <td>Bs {formatNumber(det.costoUnitario)}</td>
                    <td>Bs {formatNumber(det.cantidad * det.costoUnitario)}</td>
                    <td>
                      <button onClick={() => eliminarDetalle(idx)} className="compras-btn-delete-small">
                        ❌
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="compras-total-container">
              <strong>Total: Bs {formatNumber(totalCompra)}</strong>
            </div>

            <div className="compras-modal-buttons">
              <button onClick={() => setModalOpen(false)} className="compras-btn-cancel">
                Cancelar
              </button>
              <button onClick={guardarCompra} className="compras-btn-save">
                Registrar Compra
              </button>
            </div>
          </div>
        </div>
      )}

      {verDetallesOpen && compraSeleccionada && (
        <div className="compras-modal-overlay">
          <div className="compras-modal">
            <h2>Detalles de Compra #{compraSeleccionada.compraId}</h2>
            <p><strong>Fecha:</strong> {new Date(compraSeleccionada.fechaCompra).toLocaleString()}</p>
            <p><strong>Proveedor:</strong> {compraSeleccionada.proveedor?.nombre || `#${compraSeleccionada.proveedorId}`}</p>
            <p><strong>Usuario:</strong> {compraSeleccionada.usuario?.usuario || 'N/A'}</p>
            <p><strong>Total:</strong> Bs {formatNumber(calcularTotalCompra(compraSeleccionada))}</p>

            <h3 className="compras-subtitle">Productos</h3>
            <table className="compras-table-small">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Costo Unit.</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {compraSeleccionada.detalles?.map((det) => (
                  <tr key={det.idDetalle}>
                    <td>
                      {det.producto 
                        ? `#${det.producto.idProducto} - ${det.producto.nombre}` 
                        : `#${det.id_producto} - Producto no encontrado`}
                    </td>
                    <td>{det.cantidad}</td>
                    <td>Bs {formatNumber(det.costo_unitario)}</td>
                    <td>Bs {formatNumber(det.subtotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="compras-modal-buttons">
              <button onClick={() => setVerDetallesOpen(false)} className="compras-btn-cancel">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Compras;