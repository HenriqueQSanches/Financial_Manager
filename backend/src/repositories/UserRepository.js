const db = require('../config/database');

class UserRepository {
    static createTable() {
        return new Promise((resolve, reject) => {
            db.run(`
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL UNIQUE,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `, (err) => {
                if (err) {
                    console.error('❌ Erro ao criar tabela users:', err);
                    reject(err);
                }
                console.log('✅ Tabela users pronta!');
                resolve();
            });
        });
    }

    static findAll() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM users', [], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }

    static findByName(name) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE name = ?', [name], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    }

    static create(userData) {
        return new Promise((resolve, reject) => {
            const { name } = userData;
            db.run(
                'INSERT INTO users (name) VALUES (?)',
                [name],
                function(err) {
                    if (err) reject(err);
                    resolve({ id: this.lastID, name });
                }
            );
        });
    }
}

// Inicializar tabela
UserRepository.createTable()
    .then(() => console.log('✅ Tabela de usuários inicializada'))
    .catch(err => console.error('❌ Erro ao inicializar tabela:', err));

module.exports = UserRepository;