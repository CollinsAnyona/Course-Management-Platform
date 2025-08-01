/**
 * @swagger
 * tags:
 *   name: Facilitator Allocations
 *   description: Facilitator-specific data
 */

/**
 * @swagger
 * /facilitator/allocations:
 *   get:
 *     summary: Get allocations for the currently logged-in facilitator
 *     tags: [Facilitator Allocations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Allocations for a facilitator
 *       401:
 *         description: Unauthorized
 */


const express = require('express');
const router = express.Router();
const facilitatorController = require('../controllers/facilitatorController');

router.get('/', facilitatorController.getAllFacilitators);

module.exports = router;
