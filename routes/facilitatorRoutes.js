const express = require('express');
const router = express.Router();
const facilitatorController = require('../controllers/facilitatorController');

router.get('/', facilitatorController.getAllFacilitators);

module.exports = router;
