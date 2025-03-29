// Configuração do SQLite aqui \\
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '..', '..', 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Erro ao conectar com o banco:', err);
        return;
    }
    console.log('✅ Conectado ao banco SQLite');
});

module.exports = db;