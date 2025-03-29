const db = require('../config/database');

class UserRepository {
    static createTable() {
        return new Promise((resolve, reject) => {
            db.run(`
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT UNIQUE NOT NULL,
                    password TEXT NOT NULL,
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

    static findByEmail(email) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    }

    static create(userData) {
        return new Promise((resolve, reject) => {
            const { name, email, password } = userData;
            db.run(
                'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                [name, email, password],
                function(err) {
                    if (err) reject(err);
                    resolve({ id: this.lastID, name, email });
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

class User {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
    }

    static async findByEmail(email) {
        const userData = await UserRepository.findByEmail(email);
        return userData ? new User(userData) : null;
    }

    static async create(userData) {
        const newUser = await UserRepository.create(userData);
        return new User(newUser);
    }

    validatePassword() {
    }
}