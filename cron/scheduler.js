const cron = require('node-cron');
const { queueRemindersForWeek } = require('../services/reminderService');

cron.schedule('0 20 * * 0', async () => {
  const currentWeek = getCurrentWeek(); // Define how your app determines the academic week
  console.log(`⏰ Scheduling reminders for Week ${currentWeek}`);
  await queueRemindersForWeek(currentWeek);
});

function getCurrentWeek() {
  // Your logic here. Hardcoded for demo:
  return 8;
}
