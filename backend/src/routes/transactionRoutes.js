const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const auth = require('../middleware/auth');

router.use(auth);
router.post('/', transactionController.create);
router.get('/', transactionController.list);
router.get('/summary', transactionController.summary);

module.exports = router;