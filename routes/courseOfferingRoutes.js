const express = require('express');
const router = express.Router();
const controller = require('../controllers/courseOfferingController');
const { authenticate, restrictTo } = require('../middlewares/auth.middleware');

// Admin-only routes
router.post('/', authenticate, restrictTo('admin'), controller.create);
router.put('/:id', authenticate, restrictTo('admin'), controller.update);
router.delete('/:id', authenticate, restrictTo('admin'), controller.delete);

// Accessible to all authenticated users
router.get('/', authenticate, controller.findAll);
router.get('/:id', authenticate, controller.findOne);

module.exports = router;
