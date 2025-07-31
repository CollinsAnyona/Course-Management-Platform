// testReminderQueue.js
const { Queue } = require('bullmq');
const { connection } = require('./config/redisClient');

const reminderQueue = new Queue('reminderQueue', { connection });

async function addTestJob() {
  await reminderQueue.add('sendReminder', {
    facilitatorEmail: 'your-email@gmail.com',   // <-- Replace with YOUR email
    facilitatorName: 'Test Facilitator',
    allocationId: 'ABC123',
    weekNumber: 5
  });

  console.log('🧪 Test job added to queue!');
}

addTestJob();
