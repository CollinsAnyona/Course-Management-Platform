const { reminderQueue } = require('../config/redisClient');

(async () => {
  await reminderQueue.add('send-reminder', {
    facilitatorEmail: 'c.junior@alustudent.com',
    facilitatorName: 'Test User',
    allocationId: 123,
    weekNumber: 4
  });

  console.log('🎯 Test job added!');
})();
