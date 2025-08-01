/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       201:
 *         description: Course created
 */


const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { authenticate, restrictTo } = require('../middlewares/auth.middleware');

router.post(
  '/',
  authenticate,
  restrictTo('Admin', 'Manager'),
  courseController.createCourse
);

module.exports = router;

