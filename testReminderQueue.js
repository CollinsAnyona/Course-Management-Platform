// testReminderQueue.js
const { Queue } = require('bullmq');
const { connection } = require('./config/redisClient');

const reminderQueue = new Queue('reminderQueue', { connection });

async function addTestJob() {
  await reminderQueue.add('sendReminder', {
    facilitatorEmail: 'c.junior@alustudent.com',  
    facilitatorName: 'Test Facilitator',
    allocationId: 'ABC123',
    weekNumber: 5
  });

  console.log('🧪 Test job added to queue!');
}

addTestJob();
