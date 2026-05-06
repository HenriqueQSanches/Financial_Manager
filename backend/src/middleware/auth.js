const authMiddleware = (req, res, next) => {
    const userId = req.header('User-Id');

    if (!userId) {
        return res.status(401).json({ error: 'Nenhum perfil selecionado' });
    }

    req.userId = userId;
    next();
};

module.exports = authMiddleware;
