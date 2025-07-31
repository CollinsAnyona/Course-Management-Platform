const express = require('express');
const router = express.Router();
const controller = require('../controllers/activityTrackerController');
const { authenticate, restrictTo } = require('../middlewares/auth.middleware');

// Facilitator routes
router.post('/', authenticate, restrictTo('facilitator'), controller.create);
router.put('/:id', authenticate, restrictTo('facilitator'), controller.update);

// Manager routes
router.get('/', authenticate, restrictTo('manager'), controller.findAll);
router.get('/:id', authenticate, restrictTo('manager'), controller.findOne);

router.delete('/:id', authenticate, restrictTo('manager'), controller.delete);

module.exports = router;
