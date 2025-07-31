const { Cohort } = require('../models');

exports.getAllCohorts = async (req, res) => {
  try {
    const cohorts = await Cohort.findAll();
    res.json(cohorts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cohorts' });
  }
};
