import api from './api';

export interface LoginDto {
  usuario: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  usuario: string;
}

export const authService = {
  async login(dto: LoginDto): Promise<AuthResponse> {
    const response = await api.post('/auth/login', dto);
    return response.data;
  },

  async logout(usuarioId: number): Promise<void> {
    await api.post('/auth/logout', { usuarioId });
  },
};