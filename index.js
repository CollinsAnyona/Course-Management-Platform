require('dotenv').config();
require('./workers/reminderWorker');
require('./jobs/reminderScheduler');
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth.routes'); 
const courseOfferingRoutes = require('./routes/courseOfferingRoutes');
const courseRoutes = require('./routes/courseRoutes');
const userRoutes = require('./routes/userRoutes');
const cohortRoutes = require('./routes/cohortRoutes');
const facilitatorRoutes = require('./routes/facilitatorRoutes');
const intakeRoutes = require('./routes/intakeRoutes');
const db = require('./models');
const setupSwagger = require('./swagger');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/course-offerings', courseOfferingRoutes);
app.use('/api/activity-tracker', require('./routes/activityTrackerRoutes'));
app.use('/api/users', userRoutes);
app.use('/api/cohorts', cohortRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/facilitators', facilitatorRoutes);
app.use('/api/intakes', intakeRoutes);
setupSwagger(app);

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => console.log('DB connected'))
  .catch(err => console.error('DB connection failed:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
