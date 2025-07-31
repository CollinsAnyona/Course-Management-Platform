const { ActivityTracker, CourseOffering } = require('../models');
const { Op } = require('sequelize');

// Create log (Facilitator)
exports.create = async (req, res) => {
  try {
    const facilitatorId = req.user.id; // pulled from token
    const { allocationId, weekNumber } = req.body;

    const existing = await ActivityTracker.findOne({
      where: { allocationId, facilitatorId, weekNumber }
    });

    if (existing) {
      return res.status(400).json({ message: 'Log already exists for this week and course.' });
    }

    const data = await ActivityTracker.create({ ...req.body, facilitatorId });
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read all logs (Manager)
exports.findAll = async (req, res) => {
  try {
    const { courseId, facilitatorId, weekNumber, status } = req.query;

    const filters = {};
    if (courseId) filters.courseId = courseId;
    if (facilitatorId) filters.facilitatorId = facilitatorId;
    if (weekNumber) filters.weekNumber = weekNumber;

    if (status) {
      filters[Op.or] = [
        { attendance: status },
        { formativeOneGrading: status },
        { formativeTwoGrading: status },
        { SummativeGrading: status },
        { courseModeration: status },
        { intranetSync: status },
        { gradeBookStatus: status },
      ];
    }

    const logs = await ActivityTracker.findAll({
      where: filters,
      include: [{ model: CourseOffering }]
    });

    res.status(200).json(logs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read single log (Manager)
exports.findOne = async (req, res) => {
  try {
    const log = await ActivityTracker.findByPk(req.params.id);
    if (!log) return res.status(404).json({ message: 'Log not found' });
    res.status(200).json(log);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update log (Facilitator)
exports.update = async (req, res) => {
  try {
    const facilitatorId = req.user.id;
    const log = await ActivityTracker.findByPk(req.params.id);

    if (!log) return res.status(404).json({ message: 'Log not found' });
    if (log.facilitatorId !== facilitatorId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await log.update(req.body);
    res.status(200).json(log);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Optional Delete
exports.delete = async (req, res) => {
  try {
    const log = await ActivityTracker.findByPk(req.params.id);
    if (!log) return res.status(404).json({ message: 'Log not found' });

    await log.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
