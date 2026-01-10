const TransactionRepository = require('../repositories/TransactionRepository');

class TransactionController {
  async create(req, res) {
    try {
      const userId = req.user?.userId || req.userId; 
      const { type, items } = req.body; 
      if (!userId) return res.status(401).json({ error: 'Não autenticado' });
      if (!['income','expense'].includes(type)) return res.status(400).json({ error: 'Tipo inválido' });
      if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ error: 'Itens obrigatórios' });

      await TransactionRepository.createMany(userId, type, items);
      return res.status(201).json({ ok: true });
    } catch (e) {
      console.error('Erro ao criar transações:', e);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async list(req, res) {
    try {
      const userId = req.user?.userId || req.userId;
      if (!userId) return res.status(401).json({ error: 'Não autenticado' });

      const { type = 'all', from, to, search } = req.query;
      const data = await TransactionRepository.list({ userId, type, from, to, search });
      return res.json(data);
    } catch (e) {
      console.error('Erro ao listar transações:', e);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async summary(req, res) {
    try {
      const userId = req.user?.userId || req.userId;
      if (!userId) return res.status(401).json({ error: 'Não autenticado' });

      const { from, to } = req.query;
      const data = await TransactionRepository.summary({ userId, from, to });
      return res.json(data);
    } catch (e) {
      console.error('Erro no summary:', e);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = new TransactionController();