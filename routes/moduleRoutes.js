const express = require('express');
const router = express.Router();
const { createModule } = require('../controllers/moduleController');
const { authenticate, restrictTo } = require('../middlewares/auth.middleware');

router.post('/', authenticate, restrictTo(['Manager']), createModule);

module.exports = router;
