const cron = require('node-cron');
const { reminderQueue } = require('../config/redisClient');
const { User, CourseAllocation } = require('../models');
const { Op } = require('sequelize');

// Schedule for every Sunday at 6 PM
cron.schedule('0 18 * * 0', async () => {
  console.log('Running weekly reminder scheduler...');

  const weekNumber = getCurrentWeekNumber();
  const allocations = await CourseAllocation.findAll();

  for (const allocation of allocations) {
    const { id: allocationId, facilitatorId } = allocation;

    const existingLog = await allocation.getActivityTrackers({
      where: { weekNumber }
    });

    if (!existingLog.length) {
      const facilitator = await User.findByPk(facilitatorId);

      await reminderQueue.add('remind-facilitator', {
        facilitatorEmail: facilitator.email,
        facilitatorName: facilitator.name,
        allocationId,
        weekNumber,
      });
    }
  }
});

// Helper to determine current ISO week number
function getCurrentWeekNumber() {
  const today = new Date();
  const oneJan = new Date(today.getFullYear(), 0, 1);
  const numberOfDays = Math.floor((today - oneJan) / (24 * 60 * 60 * 1000));
  return Math.ceil((today.getDay() + 1 + numberOfDays) / 7);
}
