import api from './api';

export const authService = {
    async register(userData) {
        try {
            const response = await api.post('/api/auth/register', userData);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || 'Erro ao registrar usuário';
        }
    },

    async login(credentials) {
        try {
            const response = await api.post('/api/auth/login', credentials);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || 'Erro ao fazer login';
        }
    }
};
