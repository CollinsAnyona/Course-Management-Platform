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

const authorizeRole = require('../middleware/authorizeRole');
const authenticate = require('../middleware/authenticate');

router.post(
  '/',
  authenticate,
  authorizeRole('Manager'),
  CourseOfferingController.createCourseOffering
);

router.get(
  '/',
  authenticate,
  CourseOfferingController.getAllCourseOfferings
);
