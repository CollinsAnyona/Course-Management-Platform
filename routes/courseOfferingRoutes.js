/**
 * @swagger
 * /course-allocations:
 *   post:
 *     summary: Assign a course to a facilitator
 *     tags: [Course Allocations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: integer
 *               facilitatorId:
 *                 type: integer
 *               cohortId:
 *                 type: integer
 *               mode:
 *                 type: string
 *               trimester:
 *                 type: string
 *     responses:
 *       201:
 *         description: Course allocated
 */


const express = require('express');
const router = express.Router();
const controller = require('../controllers/courseOfferingController');
const { authenticate, restrictTo } = require('../middlewares/auth.middleware');

// Admin-only routes
router.post('/', authenticate, restrictTo('Admin','Manager'), controller.create);
router.put('/:id', authenticate, restrictTo('Admin','Manager'), controller.update);
router.delete('/:id', authenticate, restrictTo('Admin','Manager'), controller.delete);

// Accessible to all authenticated users
router.get('/', authenticate, controller.findAll);
router.get('/:id', authenticate, controller.findOne);

module.exports = router;
