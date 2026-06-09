import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Categorias from './pages/Categorias';
import Productos from './pages/Productos';
import Ventas from './pages/Ventas';
import Compras from './pages/Compras';
import Clientes from './pages/Clientes';
import ServiciosTecnicos from './pages/ServiciosTecnicos';
import Reportes from './pages/Reportes';
import Usuarios from './pages/Usuarios';
import Logs from './pages/Logs';
import Layout from './components/layout/Layout';  // ← Corregido: components/layout/Layout
import './App.css';
import Proveedores from './pages/Proveedores';

// Proteger rutas que requieren autenticación
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return token ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};

// Proteger rutas que requieren rol específico
const RoleRoute: React.FC<{ children: React.ReactNode; allowedRoles: number[] }> = ({ 
  children, 
  allowedRoles 
}) => {
  const { token, rolId, loading } = useAuth();

  console.log('🔍 RoleRoute - token:', !!token, 'rolId:', rolId, 'allowedRoles:', allowedRoles);

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(rolId || 0)) {
    return <Navigate to="/dashboard" />;
  }

  return <Layout>{children}</Layout>;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      {/* Rutas accesibles para ADMIN y VENDEDOR */}
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/categorias" element={<PrivateRoute><Categorias /></PrivateRoute>} />
      <Route path="/productos" element={<PrivateRoute><Productos /></PrivateRoute>} />
      <Route path="/proveedores" element={<PrivateRoute><Proveedores /></PrivateRoute>} />
      <Route path="/ventas" element={<PrivateRoute><Ventas /></PrivateRoute>} />
      <Route path="/compras" element={<PrivateRoute><Compras /></PrivateRoute>} />
      <Route path="/clientes" element={<PrivateRoute><Clientes /></PrivateRoute>} />
      <Route path="/servicios-tecnicos" element={<PrivateRoute><ServiciosTecnicos /></PrivateRoute>} />
      <Route path="/reportes" element={<PrivateRoute><Reportes /></PrivateRoute>} />
      
      {/* Rutas solo para ADMIN */}
      <Route path="/usuarios" element={<RoleRoute allowedRoles={[1]}><Usuarios /></RoleRoute>} />
      <Route path="/logs" element={<RoleRoute allowedRoles={[1]}><Logs /></RoleRoute>} />
      
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;