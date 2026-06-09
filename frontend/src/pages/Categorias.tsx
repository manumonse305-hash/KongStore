import React, { useState, useEffect } from 'react';
import { categoriasService, type Categoria } from '../services/categorias.service';
import { useAuth } from '../contexts/AuthContext';
import {  } from "../styles/Categorias.css";;

const Categorias: React.FC = () => {
  const { rolId } = useAuth();
  const esAdmin = rolId === 1; // Solo ADMIN puede crear/editar/eliminar
  
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState<Categoria | null>(null);
  const [formData, setFormData] = useState({ nombre: '', descripcion: '' });
  const [error, setError] = useState('');

  const cargarCategorias = async () => {
    setLoading(true);
    try {
      const data = await categoriasService.getAll();
      setCategorias(data);
    } catch (error) {
      console.error('Error cargando categorías:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const abrirCrear = () => {
    if (!esAdmin) return;
    setEditando(null);
    setFormData({ nombre: '', descripcion: '' });
    setModalOpen(true);
  };

  const abrirEditar = (categoria: Categoria) => {
    if (!esAdmin) return;
    setEditando(categoria);
    setFormData({ nombre: categoria.nombre, descripcion: categoria.descripcion || '' });
    setModalOpen(true);
  };

  const guardar = async () => {
    if (!formData.nombre.trim()) {
      setError('El nombre es obligatorio');
      return;
    }

    setError('');
    try {
      if (editando) {
        await categoriasService.update(editando.idCategoria, formData);
      } else {
        await categoriasService.create(formData);
      }
      setModalOpen(false);
      cargarCategorias();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error al guardar');
    }
  };

  const eliminar = async (id: number, nombre: string) => {
    if (!esAdmin) return;
    if (confirm(`¿Eliminar la categoría "${nombre}"?`)) {
      try {
        await categoriasService.delete(id);
        cargarCategorias();
      } catch (error) {
        console.error('Error al eliminar:', error);
      }
    }
  };

  return (
    <div className="categorias-container">
      <div className="categorias-header">
        <h1>Categorías</h1>
        {esAdmin && (
          <button onClick={abrirCrear} className="categorias-btn-primary">
            + Nueva Categoría
          </button>
        )}
      </div>

      {loading ? (
        <div className="categorias-loading">Cargando...</div>
      ) : (
        <table className="categorias-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Estado</th>
              {esAdmin && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {categorias.map((cat) => (
              <tr key={cat.idCategoria}>
                <td>{cat.idCategoria}</td>
                <td>{cat.nombre}</td>
                <td>{cat.descripcion || '-'}</td>
                <td>
                  <span className={cat.activo ? 'categorias-activo' : 'categorias-inactivo'}>
                    {cat.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                {esAdmin && (
                  <td>
                    <button onClick={() => abrirEditar(cat)} className="categorias-btn-edit">
                      Editar
                    </button>
                    <button onClick={() => eliminar(cat.idCategoria, cat.nombre)} className="categorias-btn-delete">
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
        <div className="categorias-modal-overlay">
          <div className="categorias-modal">
            <h2>{editando ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
            {error && <p className="categorias-error">{error}</p>}
            <div className="categorias-form-group">
              <label>Nombre *</label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="categorias-input"
              />
            </div>
            <div className="categorias-form-group">
              <label>Descripción</label>
              <textarea
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                className="categorias-textarea"
                rows={3}
              />
            </div>
            <div className="categorias-modal-buttons">
              <button onClick={() => setModalOpen(false)} className="categorias-btn-cancel">
                Cancelar
              </button>
              <button onClick={guardar} className="categorias-btn-save">
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categorias;