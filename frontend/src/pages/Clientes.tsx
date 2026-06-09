import React, { useState, useEffect } from 'react';
import { clientesService, type Cliente } from '../services/clientes.service';
import { useAuth } from '../contexts/AuthContext';
import {  } from "../styles/Clientes.css";

const Clientes: React.FC = () => {
  const { rolId } = useAuth();
  const esAdmin = rolId === 1;
  const esVendedor = rolId === 2;
  const puedeEditar = esAdmin || esVendedor; // ADMIN y VENDEDOR pueden editar/crear
  const puedeEliminar = esAdmin; // Solo ADMIN puede eliminar
  
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState<Cliente | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidoP: '',
    apellidoM: '',
    telefono: '',
    email: '',
  });
  const [error, setError] = useState('');
  const [telefonoError, setTelefonoError] = useState('');

  const cargarClientes = async () => {
  setLoading(true);
  try {
    const data = await clientesService.getAll();
    // Ordenar por ID de forma ascendente (menor a mayor)
    const dataOrdenada = [...data].sort((a, b) => a.id - b.id);
    setClientes(dataOrdenada);
  } catch (error) {
    console.error('Error cargando clientes:', error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    cargarClientes();
  }, []);

  const abrirCrear = () => {
    if (!puedeEditar) return;
    setEditando(null);
    setFormData({
      nombre: '',
      apellidoP: '',
      apellidoM: '',
      telefono: '',
      email: '',
    });
    setError('');
    setTelefonoError('');
    setModalOpen(true);
  };

  const abrirEditar = (cliente: Cliente) => {
    if (!puedeEditar) return;
    setEditando(cliente);
    setFormData({
      nombre: cliente.nombre,
      apellidoP: cliente.apellidoP,
      apellidoM: cliente.apellidoM,
      telefono: cliente.telefono || '',
      email: cliente.email || '',
    });
    setError('');
    setTelefonoError('');
    setModalOpen(true);
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

  const guardar = async () => {
    if (!formData.nombre.trim()) {
      setError('El nombre es obligatorio');
      return;
    }
    if (!formData.apellidoP.trim()) {
      setError('El apellido paterno es obligatorio');
      return;
    }
    if (!formData.apellidoM.trim()) {
      setError('El apellido materno es obligatorio');
      return;
    }
    if (formData.telefono && formData.telefono.length !== 8) {
      setError('El teléfono debe tener exactamente 8 dígitos');
      return;
    }

    setError('');
    setTelefonoError('');
    try {
      if (editando) {
        await clientesService.update(editando.id, formData);
      } else {
        await clientesService.create(formData);
      }
      setModalOpen(false);
      cargarClientes();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error al guardar');
    }
  };

  const eliminar = async (id: number, nombre: string) => {
    if (!puedeEliminar) return;
    if (confirm(`¿Eliminar el cliente "${nombre}"?`)) {
      try {
        await clientesService.delete(id);
        cargarClientes();
      } catch (error) {
        console.error('Error al eliminar:', error);
      }
    }
  };

  const getNombreCompleto = (cliente: Cliente) => {
    return `${cliente.nombre} ${cliente.apellidoP} ${cliente.apellidoM}`;
  };

  return (
    <div className="clientes-container">
      <div className="clientes-header">
        <h1>Clientes</h1>
        {puedeEditar && (
          <button onClick={abrirCrear} className="clientes-btn-primary">
            + Nuevo Cliente
          </button>
        )}
      </div>

      {loading ? (
        <div className="clientes-loading">Cargando...</div>
      ) : (
        <table className="clientes-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre Completo</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Estado</th>
              {(puedeEditar || puedeEliminar) && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{getNombreCompleto(cliente)}</td>
                <td>{cliente.telefono || '-'}</td>
                <td>{cliente.email || '-'}</td>
                <td>
                  <span className={cliente.activo ? 'clientes-activo' : 'clientes-inactivo'}>
                    {cliente.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                {(puedeEditar || puedeEliminar) && (
                  <td>
                    {puedeEditar && (
                      <button onClick={() => abrirEditar(cliente)} className="clientes-btn-edit">
                        Editar
                      </button>
                    )}
                    {puedeEliminar && (
                      <button onClick={() => eliminar(cliente.id, cliente.nombre)} className="clientes-btn-delete">
                        Eliminar
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalOpen && puedeEditar && (
        <div className="clientes-modal-overlay">
          <div className="clientes-modal">
            <h2>{editando ? 'Editar Cliente' : 'Nuevo Cliente'}</h2>
            {error && <p className="clientes-error">{error}</p>}
            
            <div className="clientes-row">
              <div className="clientes-form-group-half">
                <label>Nombre *</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="clientes-input"
                />
              </div>
              <div className="clientes-form-group-half">
                <label>Apellido Paterno *</label>
                <input
                  type="text"
                  value={formData.apellidoP}
                  onChange={(e) => setFormData({ ...formData, apellidoP: e.target.value })}
                  className="clientes-input"
                />
              </div>
              <div className="clientes-form-group-half">
                <label>Apellido Materno *</label>
                <input
                  type="text"
                  value={formData.apellidoM}
                  onChange={(e) => setFormData({ ...formData, apellidoM: e.target.value })}
                  className="clientes-input"
                />
              </div>
            </div>

            <div className="clientes-row">
              <div className="clientes-form-group-half">
                <label>Teléfono (8 dígitos)</label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={handleTelefonoChange}
                  placeholder="Ej: 71234567"
                  className="clientes-input"
                  maxLength={8}
                />
                {telefonoError && <span className="clientes-error-small">{telefonoError}</span>}
              </div>
              <div className="clientes-form-group-half">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="clientes-input"
                />
              </div>
            </div>

            <div className="clientes-modal-buttons">
              <button onClick={() => setModalOpen(false)} className="clientes-btn-cancel">
                Cancelar
              </button>
              <button onClick={guardar} className="clientes-btn-save">
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clientes;