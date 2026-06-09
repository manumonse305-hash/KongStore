import React, { useState, useEffect } from 'react';
import { productosService, type Producto } from '../services/productos.service';
import { categoriasService, type Categoria } from '../services/categorias.service';
import { useAuth } from '../contexts/AuthContext';
import {  } from "../styles/Productos.css";

const Productos: React.FC = () => {
  const { rolId } = useAuth();
  const esAdmin = rolId === 1;
  
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState<Producto | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio_venta: 0,
    stock: 0,
    stock_minimo: 1,
    id_categoria: 0,
    activo: true, // ← Agregar campo activo
  });
  const [error, setError] = useState('');

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const [productosData, categoriasData] = await Promise.all([
        productosService.getAll(),
        categoriasService.getAll(),
      ]);
      setProductos(productosData);
      setCategorias(categoriasData.filter(c => c.activo));
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const abrirCrear = () => {
    if (!esAdmin) return;
    setEditando(null);
    setFormData({
      nombre: '',
      descripcion: '',
      precio_venta: 0,
      stock: 0,
      stock_minimo: 1,
      id_categoria: 0,
      activo: true,
    });
    setError('');
    setModalOpen(true);
  };

  const abrirEditar = (producto: Producto) => {
    if (!esAdmin) return;
    setEditando(producto);
    setFormData({
      nombre: producto.nombre || '',
      descripcion: producto.descripcion || '',
      precio_venta: Number(producto.precio_venta) || 0,
      stock: Number(producto.stock) || 0,
      stock_minimo: Number(producto.stock_minimo) || 1,
      id_categoria: producto.id_categoria || 0,
      activo: producto.activo, // ← Agregar activo
    });
    setError('');
    setModalOpen(true);
  };

  const guardar = async () => {
    if (!formData.nombre.trim()) {
      setError('El nombre es obligatorio');
      return;
    }
    if (formData.id_categoria === 0) {
      setError('Debe seleccionar una categoría');
      return;
    }
    if (formData.precio_venta <= 0) {
      setError('El precio debe ser mayor a 0');
      return;
    }

    setError('');
    try {
      if (editando) {
        await productosService.update(editando.idProducto, {
          nombre: formData.nombre,
          descripcion: formData.descripcion,
          precio_venta: formData.precio_venta,
          stock: formData.stock,
          stock_minimo: formData.stock_minimo,
          id_categoria: formData.id_categoria,
          activo: formData.activo, // ← Enviar activo
        });
      } else {
        await productosService.create({
          nombre: formData.nombre,
          descripcion: formData.descripcion,
          precio_venta: formData.precio_venta,
          stock: formData.stock,
          stock_minimo: formData.stock_minimo,
          id_categoria: formData.id_categoria,
        });
      }
      setModalOpen(false);
      cargarDatos();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error al guardar');
    }
  };

  const eliminar = async (id: number, nombre: string) => {
    if (!esAdmin) return;
    if (confirm(`¿Eliminar el producto "${nombre}"?`)) {
      try {
        await productosService.delete(id);
        cargarDatos();
      } catch (error) {
        console.error('Error al eliminar:', error);
      }
    }
  };

  const getCategoriaNombre = (idCategoria: number) => {
    const cat = categorias.find(c => c.idCategoria === idCategoria);
    return cat?.nombre || 'Sin categoría';
  };

  const formatNumber = (value: any): string => {
    if (value === undefined || value === null) return '0.00';
    const num = typeof value === 'string' ? parseFloat(value) : Number(value);
    return isNaN(num) ? '0.00' : num.toFixed(2);
  };

  return (
    <div className="productos-container">
      <div className="productos-header">
        <h1>Productos</h1>
        {esAdmin && (
          <button onClick={abrirCrear} className="productos-btn-primary">
            + Nuevo Producto
          </button>
        )}
      </div>

      {loading ? (
        <div className="productos-loading">Cargando...</div>
      ) : (
        <table className="productos-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Stock Mínimo</th>
              <th>Estado</th>
              {esAdmin && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.idProducto}>
                <td>{prod.idProducto}</td>
                <td>{prod.nombre}</td>
                <td>{getCategoriaNombre(prod.id_categoria)}</td>
                <td>Bs {formatNumber(prod.precio_venta)}</td>
                <td>
                  <span className={prod.stock <= prod.stock_minimo ? 'productos-stock-bajo' : 'productos-stock-normal'}>
                    {prod.stock}
                  </span>
                </td>
                <td>{prod.stock_minimo}</td>
                <td>
                  <span className={prod.activo ? 'productos-activo' : 'productos-inactivo'}>
                    {prod.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                {esAdmin && (
                  <td>
                    <button onClick={() => abrirEditar(prod)} className="productos-btn-edit">
                      Editar
                    </button>
                    <button onClick={() => eliminar(prod.idProducto, prod.nombre)} className="productos-btn-delete">
                      Eliminar
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalOpen && esAdmin && (
        <div className="productos-modal-overlay">
          <div className="productos-modal">
            <h2>{editando ? 'Editar Producto' : 'Nuevo Producto'}</h2>
            {error && <p className="productos-error">{error}</p>}
            
            <div className="productos-form-group">
              <label>Nombre *</label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="productos-input"
              />
            </div>

            <div className="productos-form-group">
              <label>Categoría *</label>
              <select
                value={formData.id_categoria || 0}
                onChange={(e) => {
                  const selectedValue = Number(e.target.value);
                  setFormData({ ...formData, id_categoria: selectedValue });
                }}
                className="productos-select"
              >
                <option value={0}>Seleccione una categoría</option>
                {categorias.map((cat) => (
                  <option key={cat.idCategoria} value={cat.idCategoria}>
                    #{cat.idCategoria} - {cat.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="productos-form-group">
              <label>Descripción</label>
              <textarea
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                className="productos-textarea"
                rows={3}
              />
            </div>

            <div className="productos-row">
              <div className="productos-form-group-half">
                <label>Precio Venta *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.precio_venta}
                  onChange={(e) => setFormData({ ...formData, precio_venta: Number(e.target.value) })}
                  className="productos-input"
                />
              </div>
              <div className="productos-form-group-half">
                <label>Stock</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                  className="productos-input"
                />
              </div>
              <div className="productos-form-group-half">
                <label>Stock Mínimo</label>
                <input
                  type="number"
                  value={formData.stock_minimo}
                  onChange={(e) => setFormData({ ...formData, stock_minimo: Number(e.target.value) })}
                  className="productos-input"
                />
              </div>
            </div>

            {/* ✅ Campo para cambiar el estado (activo/inactivo) */}
            <div className="productos-form-group">
              <label>Estado</label>
              <select
                value={formData.activo ? 'true' : 'false'}
                onChange={(e) => setFormData({ ...formData, activo: e.target.value === 'true' })}
                className="productos-select"
              >
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </select>
            </div>

            <div className="productos-modal-buttons">
              <button onClick={() => setModalOpen(false)} className="productos-btn-cancel">
                Cancelar
              </button>
              <button onClick={guardar} className="productos-btn-save">
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Productos;