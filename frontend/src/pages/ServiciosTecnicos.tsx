import React, { useState, useEffect } from 'react';
import { serviciosService, type ServicioTecnico, type EstadoServicio } from '../services/servicios.service';
import { clientesService, type Cliente } from '../services/clientes.service';
import { useAuth } from '../contexts/AuthContext';
import {  } from "../styles/ServiciosTecnicos.css";

const ServiciosTecnicos: React.FC = () => {
  const { rolId } = useAuth();
  const esAdmin = rolId === 1;
  const puedeEditar = esAdmin || rolId === 2; 
  const puedeEliminar = esAdmin; // Solo ADMIN puede eliminar

  const [servicios, setServicios] = useState<ServicioTecnico[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [estados, setEstados] = useState<EstadoServicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [verDetallesOpen, setVerDetallesOpen] = useState(false);
  const [servicioSeleccionado, setServicioSeleccionado] = useState<ServicioTecnico | null>(null);
  const [editando, setEditando] = useState<ServicioTecnico | null>(null);
  const [formData, setFormData] = useState({
    clienteId: 0,
    estadoId: 1,
    equipo: '',
    problema: '',
    diagnostico: '',
    costo: 0,
    fechaEntrega: '',
  });
  const [error, setError] = useState('');

  const formatNumber = (value: any): string => {
    if (value === undefined || value === null) return '0.00';
    const num = typeof value === 'string' ? parseFloat(value) : Number(value);
    return isNaN(num) ? '0.00' : num.toFixed(2);
  };

  const estadosPredefinidos: EstadoServicio[] = [
    { id: 1, nombre: 'RECIBIDO' },
    { id: 2, nombre: 'EN_REPARACION' },
    { id: 3, nombre: 'TERMINADO' },
    { id: 4, nombre: 'ENTREGADO' },
  ];

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const [serviciosData, clientesData] = await Promise.all([
        serviciosService.getAll(),
        clientesService.getAll(),
      ]);
      const serviciosOrdenados = [...serviciosData].sort((a, b) => a.idServicio - b.idServicio);
      setServicios(serviciosOrdenados);
      setClientes(clientesData.filter(c => c.activo));
      setEstados(estadosPredefinidos);
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
    if (!puedeEditar) return;
    setEditando(null);
    setFormData({
      clienteId: 0,
      estadoId: 1,
      equipo: '',
      problema: '',
      diagnostico: '',
      costo: 0,
      fechaEntrega: '',
    });
    setError('');
    setModalOpen(true);
  };

  const abrirEditar = (servicio: ServicioTecnico) => {
    if (!puedeEditar) return;
    setEditando(servicio);
    setFormData({
      clienteId: servicio.clienteId,
      estadoId: servicio.estado?.id || servicio.estadoId,
      equipo: servicio.equipo,
      problema: servicio.problema || '',
      diagnostico: servicio.diagnostico || '',
      costo: servicio.costo || 0,
      fechaEntrega: servicio.fechaEntrega ? servicio.fechaEntrega.split('T')[0] : '',
    });
    setError('');
    setModalOpen(true);
  };

  const abrirDetalles = (servicio: ServicioTecnico) => {
    setServicioSeleccionado(servicio);
    setVerDetallesOpen(true);
  };

  const guardar = async () => {
    if (formData.clienteId === 0) {
      setError('Seleccione un cliente');
      return;
    }
    if (!formData.equipo.trim()) {
      setError('El equipo es obligatorio');
      return;
    }

    setError('');
    try {
      if (editando) {
        await serviciosService.update(editando.idServicio, formData);
      } else {
        await serviciosService.create(formData);
      }
      setModalOpen(false);
      cargarDatos();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error al guardar');
    }
  };

  const eliminar = async (id: number, equipo: string) => {
    if (!puedeEliminar) return;
    if (confirm(`¿Eliminar el servicio del equipo "${equipo}"?`)) {
      try {
        await serviciosService.delete(id);
        cargarDatos();
      } catch (error) {
        console.error('Error al eliminar:', error);
      }
    }
  };

  const getClienteNombre = (clienteId: number) => {
    const cliente = clientes.find(c => c.id === clienteId);
    return cliente ? `${cliente.nombre} ${cliente.apellidoP} ${cliente.apellidoM}` : `#${clienteId}`;
  };

  const getEstadoNombre = (estadoId: number) => {
    const estado = estados.find(e => e.id === estadoId);
    return estado?.nombre || 'Desconocido';
  };

  const getEstadoClass = (estadoId: number): string => {
    switch (estadoId) {
      case 1: return 'servicios-badge-recibido';
      case 2: return 'servicios-badge-en_reparacion';
      case 3: return 'servicios-badge-terminado';
      case 4: return 'servicios-badge-entregado';
      default: return 'servicios-badge-recibido';
    }
  };

  return (
    <div className="servicios-container">
      <div className="servicios-header">
        <h1>Servicios Técnicos</h1>
        {puedeEditar && (
          <button onClick={abrirCrear} className="servicios-btn-primary">
            + Nuevo Servicio
          </button>
        )}
      </div>

      {loading ? (
        <div className="servicios-loading">Cargando...</div>
      ) : (
        <table className="servicios-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Equipo</th>
              <th>Estado</th>
              <th>Costo</th>
              <th>F. Ingreso</th>
              {(puedeEditar || puedeEliminar) && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {servicios.map((servicio) => (
              <tr key={servicio.idServicio}>
                <td>{servicio.idServicio}</td>
                <td>{servicio.cliente ? `${servicio.cliente.nombre} ${servicio.cliente.apellidoP}` : getClienteNombre(servicio.clienteId)}</td>
                <td>{servicio.equipo}</td>
                <td>
                  <span className={`servicios-badge ${getEstadoClass(servicio.estadoId)}`}>
                    {getEstadoNombre(servicio.estadoId)}
                  </span>
                </td>
                <td>{servicio.costo ? `Bs ${formatNumber(servicio.costo)}` : '-'}</td>
                <td>{new Date(servicio.fechaIngreso).toLocaleDateString()}</td>
                {(puedeEditar || puedeEliminar) && (
                  <td>
                    <button onClick={() => abrirDetalles(servicio)} className="servicios-btn-view">Ver</button>
                    {puedeEditar && (
                      <button onClick={() => abrirEditar(servicio)} className="servicios-btn-edit">Editar</button>
                    )}
                    {puedeEliminar && (
                      <button onClick={() => eliminar(servicio.idServicio, servicio.equipo)} className="servicios-btn-delete">Eliminar</button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalOpen && puedeEditar && (
        <div className="servicios-modal-overlay">
          <div className="servicios-modal-large">
            <h2>{editando ? 'Editar Servicio' : 'Nuevo Servicio'}</h2>
            {error && <p className="servicios-error">{error}</p>}

            <div className="servicios-row">
              <div className="servicios-form-group-half">
                <label>Cliente *</label>
                <select
                  value={formData.clienteId}
                  onChange={(e) => setFormData({ ...formData, clienteId: Number(e.target.value) })}
                  className="servicios-select"
                >
                  <option value={0}>Seleccione un cliente</option>
                  {clientes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nombre} {c.apellidoP} {c.apellidoM}
                    </option>
                  ))}
                </select>
              </div>
              <div className="servicios-form-group-half">
                <label>Estado</label>
                <select
                  value={formData.estadoId}
                  onChange={(e) => setFormData({ ...formData, estadoId: Number(e.target.value) })}
                  className="servicios-select"
                >
                  {estados.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="servicios-form-group">
              <label>Equipo *</label>
              <input
                type="text"
                value={formData.equipo}
                onChange={(e) => setFormData({ ...formData, equipo: e.target.value })}
                placeholder="Ej: Laptop HP Pavilion"
                className="servicios-input"
              />
            </div>

            <div className="servicios-form-group">
              <label>Problema</label>
              <textarea
                value={formData.problema}
                onChange={(e) => setFormData({ ...formData, problema: e.target.value })}
                placeholder="Describa el problema del equipo"
                className="servicios-textarea"
                rows={3}
              />
            </div>

            <div className="servicios-form-group">
              <label>Diagnóstico</label>
              <textarea
                value={formData.diagnostico}
                onChange={(e) => setFormData({ ...formData, diagnostico: e.target.value })}
                placeholder="Diagnóstico técnico"
                className="servicios-textarea"
                rows={3}
              />
            </div>

            <div className="servicios-row">
              <div className="servicios-form-group-half">
                <label>Costo (Bs)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.costo}
                  onChange={(e) => setFormData({ ...formData, costo: Number(e.target.value) })}
                  className="servicios-input"
                />
              </div>
              <div className="servicios-form-group-half">
                <label>Fecha Entrega</label>
                <input
                  type="date"
                  value={formData.fechaEntrega}
                  onChange={(e) => setFormData({ ...formData, fechaEntrega: e.target.value })}
                  className="servicios-input"
                />
              </div>
            </div>

            <div className="servicios-modal-buttons">
              <button onClick={() => setModalOpen(false)} className="servicios-btn-cancel">Cancelar</button>
              <button onClick={guardar} className="servicios-btn-save">Guardar</button>
            </div>
          </div>
        </div>
      )}

      {verDetallesOpen && servicioSeleccionado && (
        <div className="servicios-modal-overlay">
          <div className="servicios-modal">
            <h2>Detalles del Servicio #{servicioSeleccionado.idServicio}</h2>
            <p><strong>Cliente:</strong> {getClienteNombre(servicioSeleccionado.clienteId)}</p>
            <p><strong>Equipo:</strong> {servicioSeleccionado.equipo}</p>
            <p><strong>Estado:</strong> 
              <span className={`servicios-badge ${getEstadoClass(servicioSeleccionado.estadoId)}`} style={{ marginLeft: '8px' }}>
                {getEstadoNombre(servicioSeleccionado.estadoId)}
              </span>
            </p>
            <p><strong>Fecha Ingreso:</strong> {new Date(servicioSeleccionado.fechaIngreso).toLocaleString()}</p>
            {servicioSeleccionado.fechaEntrega && (
              <p><strong>Fecha Entrega:</strong> {new Date(servicioSeleccionado.fechaEntrega).toLocaleString()}</p>
            )}
            {servicioSeleccionado.problema && (
              <p><strong>Problema:</strong> {servicioSeleccionado.problema}</p>
            )}
            {servicioSeleccionado.diagnostico && (
              <p><strong>Diagnóstico:</strong> {servicioSeleccionado.diagnostico}</p>
            )}
            {servicioSeleccionado.costo && servicioSeleccionado.costo > 0 && (
              <p><strong>Costo:</strong> Bs {formatNumber(servicioSeleccionado.costo)}</p>
            )}

            <div className="servicios-modal-buttons">
              <button onClick={() => setVerDetallesOpen(false)} className="servicios-btn-cancel">Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiciosTecnicos;