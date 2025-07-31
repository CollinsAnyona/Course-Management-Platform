const { Worker } = require('bullmq');
const { connection } = require('../config/redisClient');
const transporter = require('../config/mailer');

const reminderWorker = new Worker(
  'reminderQueue',
  async job => {
    const { facilitatorEmail, facilitatorName, allocationId, weekNumber } = job.data;

    console.log(`📤 Sending reminder email to ${facilitatorEmail} for week ${weekNumber}...`);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: facilitatorEmail,
      subject: `Reminder: Weekly Log Missing for Week ${weekNumber}`,
      text: `Dear ${facilitatorName},

Our system has noticed that you haven’t submitted your weekly activity tracker for week ${weekNumber} for your course allocation (ID: ${allocationId}). Kindly ensure you submit it before the deadline.

Best regards,
Course Management System`
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`✅ Email sent to: ${facilitatorEmail}`);
    } catch (err) {
      console.error(`❌ Failed to send email to ${facilitatorEmail}:`, err.message);
    }
  },
  { connection }
);

reminderWorker.on('completed', job => {
  console.log(`📨 Job completed for: ${job.data.facilitatorEmail}`);
});

reminderWorker.on('failed', (job, err) => {
  console.error(`❌ Job failed for ${job.data.facilitatorEmail}:`, err.message);
});

module.exports = reminderWorker;
