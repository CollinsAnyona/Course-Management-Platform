/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/activityTrackerController');
const { authenticate, restrictTo } = require('../middlewares/auth.middleware');

// Facilitator routes
router.post('/', authenticate, restrictTo('Facilitator'), controller.create);
router.put('/:id', authenticate, restrictTo('Facilitator'), controller.update);

// Manager routes
router.get('/', authenticate, restrictTo('Admin','Manager'), controller.findAll);
router.get('/:id', authenticate, restrictTo('Admin','Manager'), controller.findOne);

router.delete('/:id', authenticate, restrictTo('Admin','Manager'), controller.delete);

module.exports = router;
