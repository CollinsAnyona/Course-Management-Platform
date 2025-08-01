const { Queue } = require('bullmq');

const connection = {
  host: '127.0.0.1',
  port: 6379,
  maxRetriesPerRequest: null, 
};

const reminderQueue = new Queue('reminderQueue', { connection });

module.exports = { reminderQueue, connection };
