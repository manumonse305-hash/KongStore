import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Menu.css';

interface MenuItem {
  path: string;
  label: string;
  icon: string;
  roles: number[]; // 1: ADMIN, 2: VENDEDOR
}

const menuItems: MenuItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: '📊', roles: [1, 2] },
  { path: '/proveedores', label: 'Proveedores', icon: '👥', roles: [1, 2] },
  { path: '/productos', label: 'Productos', icon: '📦', roles: [1, 2] },
  { path: '/categorias', label: 'Categorías', icon: '🏷️', roles: [1, 2] },
  { path: '/ventas', label: 'Ventas', icon: '💰', roles: [1, 2] },
  { path: '/compras', label: 'Compras', icon: '🛒', roles: [1, 2] },
  { path: '/clientes', label: 'Clientes', icon: '👥', roles: [1, 2] },
  { path: '/servicios-tecnicos', label: 'Servicios Técnicos', icon: '🔧', roles: [1, 2] },
  { path: '/reportes', label: 'Reportes', icon: '📄', roles: [1, 2] },
  { path: '/usuarios', label: 'Usuarios', icon: '👤', roles: [1] }, // Solo ADMIN
  { path: '/logs', label: 'Logs de Acceso', icon: '📋', roles: [1] }, // Solo ADMIN
];

const Menu: React.FC = () => {
  const { rolId } = useAuth();
  const location = useLocation();

  const itemsFiltrados = menuItems.filter(item => 
    item.roles.includes(rolId || 0)
  );

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="menu-nav">
      <div className="menu-logo">
        <h2>🏪 Kong Store</h2>
        <p className="menu-role-text">
          {rolId === 1 ? 'Administrador' : 'Vendedor'}
        </p>
      </div>
      <ul className="menu-list">
        {itemsFiltrados.map((item) => (
          <li key={item.path} className="menu-item">
            <Link
              to={item.path}
              className={`menu-link ${isActive(item.path) ? 'menu-link-active' : ''}`}
            >
              <span className="menu-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;