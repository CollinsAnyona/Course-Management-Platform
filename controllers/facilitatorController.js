const { Facilitator } = require('../models');

exports.getAllFacilitators = async (req, res) => {
  try {
    const facilitators = await Facilitator.findAll();
    res.json(facilitators);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch facilitators' });
  }
};
