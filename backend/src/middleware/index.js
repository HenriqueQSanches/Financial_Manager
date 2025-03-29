const corsMiddleware = require('./cors');
const authMiddleware = require('./auth');

module.exports = {
    corsMiddleware,
    authMiddleware
};