import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/auth.service';

interface AuthContextType {
  user: string | null;
  userId: number | null;
  rolId: number | null;
  token: string | null;
  loading: boolean;
  login: (usuario: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthResponse {
  access_token: string;
  usuario: string;
}

// Función para decodificar el token y obtener el userId y rolId
const decodeToken = (token: string): { userId: number | null; rolId: number | null } => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      userId: payload.sub,     // el 'sub' contiene el idUsuario
      rolId: payload.rolId,    // el 'rolId' viene en el payload
    };
  } catch (error) {
    console.error('Error decodificando token:', error);
    return { userId: null, rolId: null };
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [rolId, setRolId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const storedUserId = localStorage.getItem('userId');
    const storedRolId = localStorage.getItem('rolId');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
      
      if (storedUserId) {
        setUserId(Number(storedUserId));
      }
      
      if (storedRolId) {
        setRolId(Number(storedRolId));
      }
      
      if (!storedUserId || !storedRolId) {
        // Decodificar del token si no hay datos guardados
        const decoded = decodeToken(storedToken);
        if (decoded.userId) {
          setUserId(decoded.userId);
          localStorage.setItem('userId', String(decoded.userId));
        }
        if (decoded.rolId) {
          setRolId(decoded.rolId);
          localStorage.setItem('rolId', String(decoded.rolId));
        }
      }
    }

    setLoading(false);
  }, []);

  const login = async (usuario: string, password: string): Promise<void> => {
    try {
      const response: AuthResponse = await authService.login({ usuario, password });

      // Guardar token y usuario
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('user', response.usuario);

      // Decodificar token para obtener userId y rolId
      const decoded = decodeToken(response.access_token);
      
      if (decoded.userId) {
        localStorage.setItem('userId', String(decoded.userId));
        setUserId(decoded.userId);
      }
      
      if (decoded.rolId) {
        localStorage.setItem('rolId', String(decoded.rolId));
        setRolId(decoded.rolId);
      }

      setToken(response.access_token);
      setUser(response.usuario);
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      if (userId) {
        await authService.logout(userId);
      }
    } catch (error) {
      console.warn('Error en logout:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
      localStorage.removeItem('rolId');

      setToken(null);
      setUser(null);
      setUserId(null);
      setRolId(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, userId, rolId, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};