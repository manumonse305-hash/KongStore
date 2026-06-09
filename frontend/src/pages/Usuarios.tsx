import React, { useState, useEffect } from 'react';
import { usuariosService, type Usuario } from '../services/usuarios.service';
import { useAuth } from '../contexts/AuthContext';
import { evaluarPassword } from '../utils/passwordStrength';
import {  } from "../styles/Usuarios.css";
const Usuarios: React.FC = () => {
  const { rolId } = useAuth();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState<Usuario | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidoP: '',
    apellidoM: '',
    usuario: '',
    email: '',
    password: '',
    confirmPassword: '',
    idRol: 2,
  });
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<string | null>(null);

  // Verificar si es ADMIN (rolId = 1)
  if (rolId !== 1) {
    return (
      <div className="usuarios-container">
        <div className="usuarios-access-denied">
          <h2>Acceso Denegado</h2>
          <p>No tienes permisos para ver esta página.</p>
        </div>
      </div>
    );
  }

  const cargarUsuarios = async () => {
    setLoading(true);
    try {
      const data = await usuariosService.getAll();
      const dataOrdenada = [...data].sort((a, b) => a.idUsuario - b.idUsuario);
      setUsuarios(dataOrdenada);
    } catch (error) {
      console.error('Error cargando usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, password: value });
    if (value) {
      const strength = evaluarPassword(value);
      setPasswordStrength(strength);
    } else {
      setPasswordStrength(null);
    }
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 'DEBIL': return '#ff4d4f';
      case 'MEDIA': return '#faad14';
      case 'FUERTE': return '#52c41a';
      default: return '#ddd';
    }
  };

  const getStrengthText = () => {
    switch (passwordStrength) {
      case 'DEBIL': return 'Débil';
      case 'MEDIA': return 'Media';
      case 'FUERTE': return 'Fuerte';
      default: return '';
    }
  };

  const abrirCrear = () => {
    setEditando(null);
    setFormData({
      nombre: '',
      apellidoP: '',
      apellidoM: '',
      usuario: '',
      email: '',
      password: '',
      confirmPassword: '',
      idRol: 2,
    });
    setPasswordStrength(null);
    setError('');
    setModalOpen(true);
  };

  const abrirEditar = (usuario: Usuario) => {
    setEditando(usuario);
    setFormData({
      nombre: usuario.nombre,
      apellidoP: usuario.apellidoP,
      apellidoM: usuario.apellidoM,
      usuario: usuario.usuario,
      email: usuario.email || '',
      password: '',
      confirmPassword: '',
      idRol: usuario.rolId,
    });
    setPasswordStrength(null);
    setError('');
    setModalOpen(true);
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
    if (!formData.usuario.trim()) {
      setError('El nombre de usuario es obligatorio');
      return;
    }
    if (!editando && !formData.password) {
      setError('La contraseña es obligatoria');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // Validar fortaleza de contraseña para nueva o si se está cambiando
    if (formData.password && (!editando || (editando && formData.password))) {
      const strength = evaluarPassword(formData.password);
      if (strength === 'DEBIL') {
        setError('La contraseña es demasiado débil. Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.');
        return;
      }
    }

    setError('');
    try {
      if (editando) {
        const updateData: any = {
          nombre: formData.nombre,
          apellidoP: formData.apellidoP,
          apellidoM: formData.apellidoM,
          usuario: formData.usuario,
          email: formData.email || undefined,
          idRol: formData.idRol,
        };
        if (formData.password) {
          updateData.password = formData.password;
          updateData.confirmPassword = formData.confirmPassword;
        }
        await usuariosService.update(editando.idUsuario, updateData);
      } else {
        await usuariosService.create({
          nombre: formData.nombre,
          apellidoP: formData.apellidoP,
          apellidoM: formData.apellidoM,
          usuario: formData.usuario,
          email: formData.email || undefined,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          idRol: formData.idRol,
        });
      }
      setModalOpen(false);
      cargarUsuarios();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error al guardar');
    }
  };

  const eliminar = async (id: number, nombre: string) => {
    if (confirm(`¿Eliminar el usuario "${nombre}"?`)) {
      try {
        await usuariosService.delete(id);
        cargarUsuarios();
      } catch (error) {
        console.error('Error al eliminar:', error);
      }
    }
  };

  const getNombreCompleto = (usuario: Usuario) => {
    return `${usuario.nombre} ${usuario.apellidoP} ${usuario.apellidoM}`;
  };

  const getRolNombre = (usuario: Usuario) => {
    if (usuario.rolId === 1) return 'ADMIN';
    if (usuario.rolId === 2) return 'VENDEDOR';
    return 'Desconocido';
  };

  const getRolClass = (rolId: number): string => {
    return rolId === 1 ? 'usuarios-badge-admin' : 'usuarios-badge-vendedor';
  };

  return (
    <div className="usuarios-container">
      <div className="usuarios-header">
        <h1>Usuarios</h1>
        <button onClick={abrirCrear} className="usuarios-btn-primary">
          + Nuevo Usuario
        </button>
      </div>

      {loading ? (
        <div className="usuarios-loading">Cargando...</div>
      ) : (
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre Completo</th>
              <th>Usuario</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.idUsuario}>
                <td>{usuario.idUsuario}</td>
                <td>{getNombreCompleto(usuario)}</td>
                <td>{usuario.usuario}</td>
                <td>{usuario.email || '-'}</td>
                <td>
                  <span className={`usuarios-badge ${getRolClass(usuario.rolId)}`}>
                    {getRolNombre(usuario)}
                  </span>
                </td>
                <td>
                  <span className={usuario.activo ? 'usuarios-activo' : 'usuarios-inactivo'}>
                    {usuario.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td>
                  <button onClick={() => abrirEditar(usuario)} className="usuarios-btn-edit">
                    Editar
                  </button>
                  <button onClick={() => eliminar(usuario.idUsuario, usuario.usuario)} className="usuarios-btn-delete">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalOpen && (
        <div className="usuarios-modal-overlay">
          <div className="usuarios-modal-large">
            <h2>{editando ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
            {error && <p className="usuarios-error">{error}</p>}

            <div className="usuarios-row">
              <div className="usuarios-form-group-half">
                <label>Nombre *</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="usuarios-input"
                />
              </div>
              <div className="usuarios-form-group-half">
                <label>Apellido Paterno *</label>
                <input
                  type="text"
                  value={formData.apellidoP}
                  onChange={(e) => setFormData({ ...formData, apellidoP: e.target.value })}
                  className="usuarios-input"
                />
              </div>
              <div className="usuarios-form-group-half">
                <label>Apellido Materno *</label>
                <input
                  type="text"
                  value={formData.apellidoM}
                  onChange={(e) => setFormData({ ...formData, apellidoM: e.target.value })}
                  className="usuarios-input"
                />
              </div>
            </div>

            <div className="usuarios-row">
              <div className="usuarios-form-group-half">
                <label>Usuario *</label>
                <input
                  type="text"
                  value={formData.usuario}
                  onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
                  className="usuarios-input"
                />
              </div>
              <div className="usuarios-form-group-half">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="usuarios-input"
                />
              </div>
            </div>

            <div className="usuarios-row">
              <div className="usuarios-form-group-half">
                <label>Contraseña {!editando && '*'}</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={handlePasswordChange}
                  placeholder={editando ? 'Dejar vacío para no cambiar' : ''}
                  className="usuarios-input"
                />
                {passwordStrength && (
                  <div style={{ marginTop: '5px' }}>
                    <div style={{ 
                      height: '4px', 
                      backgroundColor: getStrengthColor(),
                      borderRadius: '2px',
                      width: '100%'
                    }} />
                    <span style={{ fontSize: '12px', color: getStrengthColor() }}>
                      Fortaleza: {getStrengthText()}
                    </span>
                  </div>
                )}
              </div>
              <div className="usuarios-form-group-half">
                <label>Confirmar Contraseña {!editando && '*'}</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="usuarios-input"
                />
              </div>
            </div>

            <div className="usuarios-form-group">
              <label>Rol *</label>
              <select
                value={formData.idRol}
                onChange={(e) => setFormData({ ...formData, idRol: Number(e.target.value) })}
                className="usuarios-select"
              >
                <option value={1}>ADMIN</option>
                <option value={2}>VENDEDOR</option>
              </select>
            </div>

            <div className="usuarios-modal-buttons">
              <button onClick={() => setModalOpen(false)} className="usuarios-btn-cancel">
                Cancelar
              </button>
              <button onClick={guardar} className="usuarios-btn-save">
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Usuarios;