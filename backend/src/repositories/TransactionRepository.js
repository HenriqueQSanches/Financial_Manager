const db = require('../config/database');

class TransactionRepository {
  static createTable() {
    return new Promise((resolve, reject) => {
      db.run(`
        CREATE TABLE IF NOT EXISTS transactions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          type TEXT NOT NULL CHECK (type IN ('income','expense')),
          amount REAL NOT NULL CHECK (amount >= 0),
          date TEXT NOT NULL,
          category TEXT,
          description TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `, (err) => err ? reject(err) : resolve());
    });
  }

  static createMany(userId, type, items) {
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run('BEGIN TRANSACTION');
        const stmt = db.prepare(`
          INSERT INTO transactions (user_id, type, amount, date, category, description)
          VALUES (?, ?, ?, ?, ?, ?)
        `);

        items.forEach(it => {
          stmt.run([userId, type, it.amount, it.date, it.category || null, it.description || null]);
        });

        stmt.finalize((err) => {
          if (err) return reject(err);
          db.run('COMMIT', (err2) => err2 ? reject(err2) : resolve());
        });
      });
    });
  }

  static list({ userId, type, from, to, search }) {
    return new Promise((resolve, reject) => {
      const where = ['user_id = ?'];
      const params = [userId];

      if (type && type !== 'all') { where.push('type = ?'); params.push(type); }
      if (from) { where.push('date >= ?'); params.push(from); }
      if (to) { where.push('date <= ?'); params.push(to); }
      if (search) { where.push('(category LIKE ? OR description LIKE ?)'); params.push(`%${search}%`, `%${search}%`); }

      const sql = `
        SELECT id, type, amount, date, category, description, created_at
        FROM transactions
        WHERE ${where.join(' AND ')}
        ORDER BY date DESC, id DESC
      `;
      db.all(sql, params, (err, rows) => err ? reject(err) : resolve(rows));
    });
  }

  static summary({ userId, from, to }) {
    return new Promise((resolve, reject) => {
      const where = ['user_id = ?'];
      const params = [userId];
      if (from) { where.push('date >= ?'); params.push(from); }
      if (to) { where.push('date <= ?'); params.push(to); }

      const sql = `
        SELECT
          SUM(CASE WHEN type = 'income'  THEN amount ELSE 0 END) AS total_income,
          SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense
        FROM transactions
        WHERE ${where.join(' AND ')}
      `;
      db.get(sql, params, (err, row) => {
        if (err) return reject(err);
        const income = row?.total_income || 0;
        const expense = row?.total_expense || 0;
        resolve({ income, expense, balance: income - expense });
      });
    });
  }
}

TransactionRepository.createTable()
  .then(() => console.log('✅ Tabela transactions pronta!'))
  .catch(err => console.error('❌ Falha ao inicializar transactions:', err));

module.exports = TransactionRepository;