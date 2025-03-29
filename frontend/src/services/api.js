// Configuração e funções para consumir o backend \\
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Porta onde seu backend Node.js estará rodando (Ou a que você preferir, só confirme isso para podermos rodar o frontend e o backend juntos)

    // baseURL: 'https://api.example.com', // URL do seu backend em produção (Confirme corretamente também para não termos problemas, eu sempre coloco alguns debugs também, mas com o tempo, isso passa a ser natural.)
    
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;