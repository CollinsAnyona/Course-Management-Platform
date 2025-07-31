const { reminderQueue } = require('../config/redisClient');
const { ActivityTracker, CourseOffering, User } = require('../models');
const { Op } = require('sequelize');

async function queueRemindersForWeek(weekNumber) {
  const allocations = await CourseOffering.findAll();

  const reminders = await Promise.all(allocations.map(async (allocation) => {
    const log = await ActivityTracker.findOne({
      where: { allocationId: allocation.id, weekNumber }
    });

    if (!log) {
      const facilitator = await User.findByPk(allocation.facilitatorId);
      return reminderQueue.add('sendReminder', {
        facilitatorId: facilitator.id,
        email: facilitator.email,
        weekNumber,
        course: allocation.courseCode
      });
    }
  }));

  return reminders;
}

module.exports = { queueRemindersForWeek };
