// Configuração e funções para consumir o backend \\
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Porta onde seu backend Node.js estará rodando
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Adiciona o User-Id em todas as requisições, se houver perfil selecionado
api.interceptors.request.use(config => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      if (user && user.id) {
        config.headers['User-Id'] = user.id;
      }
    } catch (e) {
      console.error("Erro ao ler usuário do localStorage", e);
    }
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;