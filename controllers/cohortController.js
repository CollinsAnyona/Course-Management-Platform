const { Cohort, IntakePeriod } = require('../models');

exports.createCohort = async (req, res) => {
  try {
    const { cohortName, startDate, endDate, name, intake } = req.body;

    // First, create the intake period
    const intakePeriod = await IntakePeriod.create({
      name,
      intake,
      startDate,
      endDate,
    });

    // Then, create the cohort linked to intake
    const cohort = await Cohort.create({
      name: cohortName,
      intakePeriodId: intakePeriod.id, // assuming your Cohort model has this FK
    });

    res.status(201).json({ message: 'Cohort and intake created', cohort });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create cohort and intake' });
  }
};

exports.getAllCohorts = async (req, res) => {
  try {
    const cohorts = await Cohort.findAll(); // assuming Sequelize
    res.json(cohorts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cohorts' });
  }
};
