const User = require('../models/User');

class AuthController {
    async getProfiles(req, res) {
        try {
            const profiles = await User.findAll();
            return res.json(profiles.map(p => p.toJSON()));
        } catch (error) {
            console.error('Erro ao buscar perfis:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    async createProfile(req, res) {
        const { name } = req.body;
        
        try {
            if (!name) {
                return res.status(400).json({ error: 'O nome é obrigatório' });
            }

            // Verificar se usuário já existe
            const existingUser = await User.findByName(name);
            if (existingUser) {
                return res.status(400).json({ error: 'Perfil já cadastrado' });
            }

            // Criar novo usuário
            const user = await User.create({ name });

            return res.status(201).json({
                user: user.toJSON()
            });

        } catch (error) {
            console.error('Erro no registro de perfil:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}

module.exports = new AuthController();