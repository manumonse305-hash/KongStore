import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Menu from './Menu';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  return (
    <div className="layout-container">
      <Menu />
      <div className="layout-content">
        <div className="layout-header">
          <div className="layout-header-left">
            <span className="layout-welcome">Bienvenido, {user}</span>
          </div>
          <button onClick={handleLogout} className="layout-logout-btn">
            <span></span> Cerrar Sesión
          </button>
        </div>
        <div className="layout-main">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;