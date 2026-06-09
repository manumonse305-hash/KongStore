import React, { useState, useEffect } from 'react';
import { logsService, type LogAcceso } from '../services/logs.service';
import { usuariosService, type Usuario } from '../services/usuarios.service';
import { useAuth } from '../contexts/AuthContext';
import {} from '../styles/Logs.css';

const Logs: React.FC = () => {
  const { rolId } = useAuth();
  const [logs, setLogs] = useState<LogAcceso[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroUsuario, setFiltroUsuario] = useState<number>(0);

  // Verificar si es ADMIN (rolId = 1)
  if (rolId !== 1) {
    return (
      <div className="logs-container">
        <div className="logs-access-denied">
          <h2>Acceso Denegado</h2>
          <p>No tienes permisos para ver esta página.</p>
        </div>
      </div>
    );
  }

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const [logsData, usuariosData] = await Promise.all([
        logsService.getAll(),
        usuariosService.getAll(),
      ]);
      setLogs(logsData);
      setUsuarios(usuariosData);
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const getUsuarioNombre = (usuarioId: number) => {
    const usuario = usuarios.find(u => u.idUsuario === usuarioId);
    return usuario ? `${usuario.nombre} ${usuario.apellidoP} ${usuario.apellidoM}` : `Usuario #${usuarioId}`;
  };

  const logsFiltrados = filtroUsuario === 0 
    ? logs 
    : logs.filter(log => log.usuarioId === filtroUsuario);

  const getEventoClass = (evento: string): string => {
    return evento === 'INGRESO' ? 'logs-badge-ingreso' : 'logs-badge-salida';
  };

  return (
    <div className="logs-container">
      <div className="logs-header">
        <h1>Logs de Acceso</h1>
      </div>

      <div className="logs-filtro">
        <label>Filtrar por usuario:</label>
        <select
          value={filtroUsuario}
          onChange={(e) => setFiltroUsuario(Number(e.target.value))}
          className="logs-select"
        >
          <option value={0}>Todos los usuarios</option>
          {usuarios.map((u) => (
            <option key={u.idUsuario} value={u.idUsuario}>
              #{u.idUsuario} - {u.nombre} {u.apellidoP} {u.apellidoM} ({u.usuario})
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="logs-loading">Cargando...</div>
      ) : (
        <table className="logs-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Evento</th>
              <th>IP</th>
              <th>Navegador</th>
              <th>Fecha/Hora</th>
            </tr>
          </thead>
          <tbody>
            {logsFiltrados.map((log) => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td>{getUsuarioNombre(log.usuarioId)}</td>
                <td>
                  <span className={`logs-badge ${getEventoClass(log.evento)}`}>
                    {log.evento}
                  </span>
                </td>
                <td>{log.ip || '-'}</td>
                <td className="logs-browser-cell">{log.browser?.substring(0, 50)}...</td>
                <td>{new Date(log.fechaHora).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && logsFiltrados.length === 0 && (
        <div className="logs-empty">No hay registros de acceso</div>
      )}
    </div>
  );
};

export default Logs;