// Config principal do meu servidor \\
const express = require('express');
const corsMiddleware = require('./middleware/cors');
const routes = require('./routes');

const app = express();

// Middlewares globais
app.use(corsMiddleware);
app.use(express.json());

// Rotas da API
app.use('/api', routes);

// Rota de teste para verificar se API está funcionando
app.get('/', (req, res) => {
    res.json({ message: 'Financial Manager API is running!' });
});

// Tratamento de erros global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

module.exports = app;