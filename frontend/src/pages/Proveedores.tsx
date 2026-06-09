import React, { useState, useEffect } from 'react';
import { proveedoresService, type Proveedor } from '../services/proveedores.service';
import { useAuth } from '../contexts/AuthContext';
import {} from "../styles/Proveedores.css"

const Proveedores: React.FC = () => {
  const { rolId } = useAuth();
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState<Proveedor | null>(null);
  
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    direccion: '',
  });
  const [error, setError] = useState('');
  const [telefonoError, setTelefonoError] = useState('');

  const esAdmin = rolId === 1;

  const validarTelefono = (telefono: string): boolean => {
    if (!telefono) return true;
    const regex = /^\d{8}$/;
    return regex.test(telefono);
  };

  const cargarProveedores = async () => {
    setLoading(true);
    try {
      const data = await proveedoresService.getAll();
      setProveedores(data);
    } catch (error) {
      console.error('Error cargando proveedores:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProveedores();
  }, []);

  const abrirCrear = () => {
    if (!esAdmin) return;
    setEditando(null);
    setFormData({
      nombre: '',
      telefono: '',
      email: '',
      direccion: '',
    });
    setError('');
    setTelefonoError('');
    setModalOpen(true);
  };

  const abrirEditar = (proveedor: Proveedor) => {
    if (!esAdmin) return;
    setEditando(proveedor);
    setFormData({
      nombre: proveedor.nombre,
      telefono: proveedor.telefono || '',
      email: proveedor.email || '',
      direccion: proveedor.direccion || '',
    });
    setError('');
    setTelefonoError('');
    setModalOpen(true);
  };

  const guardar = async () => {
    if (!formData.nombre.trim()) {
      setError('El nombre es obligatorio');
      return;
    }

    if (formData.telefono && !validarTelefono(formData.telefono)) {
      setTelefonoError('El teléfono debe tener exactamente 8 dígitos');
      setError('El teléfono debe tener exactamente 8 dígitos');
      return;
    }

    setError('');
    setTelefonoError('');
    try {
      if (editando) {
        await proveedoresService.update(editando.idProveedor, formData);
      } else {
        await proveedoresService.create(formData);
      }
      setModalOpen(false);
      cargarProveedores();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error al guardar');
    }
  };

  const eliminar = async (id: number, nombre: string) => {
    if (!esAdmin) return;
    if (confirm(`¿Eliminar el proveedor "${nombre}"?`)) {
      try {
        await proveedoresService.delete(id);
        cargarProveedores();
      } catch (error) {
        console.error('Error al eliminar:', error);
      }
    }
  };

  const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d{0,8}$/.test(value)) {
      setFormData({ ...formData, telefono: value });
      if (value && value.length !== 8) {
        setTelefonoError('El teléfono debe tener exactamente 8 dígitos');
      } else {
        setTelefonoError('');
      }
    } else {
      setTelefonoError('El teléfono solo puede contener números');
    }
  };

  return (
    <div className="proveedores-container">
      <div className="proveedores-header">
        <h1>Proveedores</h1>
        {esAdmin && (
          <button onClick={abrirCrear} className="proveedores-btn-primary">
            + Nuevo Proveedor
          </button>
        )}
      </div>

      {loading ? (
        <div className="proveedores-loading">Cargando...</div>
      ) : (
        <table className="proveedores-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Dirección</th>
              <th>Estado</th>
              {esAdmin && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {proveedores.map((prov) => (
              <tr key={prov.idProveedor}>
                <td>{prov.idProveedor}</td>
                <td>{prov.nombre}</td>
                <td>{prov.telefono || '-'}</td>
                <td>{prov.email || '-'}</td>
                <td className="proveedores-direccion-cell">{prov.direccion || '-'}</td>
                <td>
                  <span className={prov.activo ? 'proveedores-activo' : 'proveedores-inactivo'}>
                    {prov.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                {esAdmin && (
                  <td>
                    <button onClick={() => abrirEditar(prov)} className="proveedores-btn-edit">
                      Editar
                    </button>
                    <button onClick={() => eliminar(prov.idProveedor, prov.nombre)} className="proveedores-btn-delete">
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
        <div className="proveedores-modal-overlay">
          <div className="proveedores-modal">
            <h2>{editando ? 'Editar Proveedor' : 'Nuevo Proveedor'}</h2>
            {error && <p className="proveedores-error">{error}</p>}

            <div className="proveedores-form-group">
              <label>Nombre *</label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="proveedores-input"
              />
            </div>

            <div className="proveedores-row">
              <div className="proveedores-form-group-half">
                <label>Teléfono (8 dígitos)</label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={handleTelefonoChange}
                  placeholder="Ej: 71234567"
                  className="proveedores-input"
                />
                {telefonoError && <span className="proveedores-error-small">{telefonoError}</span>}
              </div>
              <div className="proveedores-form-group-half">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="proveedores-input"
                />
              </div>
            </div>

            <div className="proveedores-form-group">
              <label>Dirección</label>
              <textarea
                value={formData.direccion}
                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                className="proveedores-textarea"
                rows={2}
              />
            </div>

            <div className="proveedores-modal-buttons">
              <button onClick={() => setModalOpen(false)} className="proveedores-btn-cancel">
                Cancelar
              </button>
              <button onClick={guardar} className="proveedores-btn-save">
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Proveedores;