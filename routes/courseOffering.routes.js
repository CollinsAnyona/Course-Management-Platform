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
