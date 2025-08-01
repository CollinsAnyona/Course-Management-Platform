/**
 * @swagger
 * tags:
 *   name: Cohorts
 *   description: Cohort management
 */

/**
 * @swagger
 * /cohorts:
 *   get:
 *     summary: Get all cohorts
 *     tags: [Cohorts]
 *     responses:
 *       200:
 *         description: List of cohorts
 */

/**
 * @swagger
 * /cohorts:
 *   post:
 *     summary: Create a new cohort
 *     tags: [Cohorts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cohortName:
 *                 type: string
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cohort created
 */


const express = require('express');
const router = express.Router();
const cohortController = require('../controllers/cohortController');
const { authenticate, restrictTo } = require('../middlewares/auth.middleware');

router.post('/', authenticate, restrictTo('Admin', 'Manager'), cohortController.createCohort);
router.get(
    '/',
    authenticate,
    restrictTo('Admin', 'Manager'),
    cohortController.getAllCohorts
  );
  
module.exports = router;

