const express = require('express');
const router = express.Router();
const intakeController = require('../controllers/intakeController');

router.get('/', intakeController.getAllIntakes);

module.exports = router;
