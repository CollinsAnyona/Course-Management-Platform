const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, restrictTo } = require('../middlewares/auth.middleware');

router.get('/', authenticate, restrictTo(['Admin', 'Manager']), userController.getAllUsers);

module.exports = router;
