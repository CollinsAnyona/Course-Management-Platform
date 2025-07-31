const { IntakePeriod } = require('../models');

exports.getAllIntakes = async (req, res) => {
  try {
    const intakes = await IntakePeriod.findAll();
    res.json(intakes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch intake periods' });
  }
};
