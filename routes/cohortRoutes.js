const express = require('express');
const router = express.Router();
const cohortController = require('../controllers/cohortController');

router.get('/', cohortController.getAllCohorts);

module.exports = router;
