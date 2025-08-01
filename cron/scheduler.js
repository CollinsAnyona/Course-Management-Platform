const cron = require('node-cron');
const { queueRemindersForWeek } = require('../services/reminderService');

cron.schedule('0 20 * * 0', async () => {
  const currentWeek = getCurrentWeek();
  console.log(`⏰ Scheduling reminders for Week ${currentWeek}`);
  await queueRemindersForWeek(currentWeek);
});

function getCurrentWeek() {
  return 8;
}
