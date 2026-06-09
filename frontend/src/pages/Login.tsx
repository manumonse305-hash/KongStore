import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ReCAPTCHA from "react-google-recaptcha";
import {} from '../styles/Login.css'

const Login: React.FC = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(usuario, password);
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Usuario o contraseña incorrectos');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Kong Store</h1>
        <h2 className="login-subtitle">Iniciar Sesión</h2>

        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="login-input-group">
            <label className="login-label">Usuario</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="login-input"
              placeholder="Ingrese su usuario"
              required
            />
          </div>

          <div className="login-input-group">
            <label className="login-label">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              placeholder="Ingrese su contraseña"
              required
            />
          </div>

          <div className="login-captcha">
            <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            />
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;