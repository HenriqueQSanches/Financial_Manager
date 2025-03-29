const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthController {
    async login(req, res) {
        const { email, password } = req.body;
        
        try {
            const user = await User.findByEmail(email);
            
            if (!user) {
                return res.status(401).json({ error: 'User not found' });
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ error: 'Invalid password' });
            }

            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            return res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async register(req, res) {
        const { name, email, password } = req.body;
        
        try {
            const existingUser = await User.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ error: 'Email already registered' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ name, email, password: hashedPassword });

            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            return res.status(201).json({ token, user: { id: user.id, name, email } });
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = new AuthController();