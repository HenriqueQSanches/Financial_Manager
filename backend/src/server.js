// Inicialização do Servidor \\
require('dotenv').config();
const app = require('./app');
const db = require('./config/database');
require('./repositories/TransactionRepository');

const PORT = process.env.PORT || 3000;

// Iniciando o servidor
app.listen(PORT, () => {
    console.log('🎯 Iniciando o Financial Manager API...');
    console.log(`📡 Servidor rodando em http://localhost:${PORT}`);
    console.log('🔥 Ambiente:', process.env.NODE_ENV || 'development');
});

// Tratamento de erros não capturados
process.on('unhandledRejection', (err) => {
    console.error('🔴 Erro não tratado:', err);
    process.exit(1);
});