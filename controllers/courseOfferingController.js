const { CourseOffering, Module, Facilitator, Cohort, Class, IntakePeriod, Mode } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const offering = await CourseOffering.create(req.body);
      res.status(201).json(offering);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create course offering' });
    }
  },

  async findAll(req, res) {
    try {
      const offerings = await CourseOffering.findAll({
        include: [
          { model: Module, as: 'module' },
          { model: Facilitator, as: 'facilitator' },
          { model: Cohort, as: 'cohort' },
          { model: Class, as: 'class' },
          { model: IntakePeriod, as: 'intakePeriod' },
          { model: Mode, as: 'mode' }
        ]
      });
      res.json(offerings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch course offerings' });
    }
  },

  async findOne(req, res) {
    try {
      const offering = await CourseOffering.findByPk(req.params.id, {
        include: [
          { model: Module, as: 'module' },
          { model: Facilitator, as: 'facilitator' },
          { model: Cohort, as: 'cohort' },
          { model: Class, as: 'class' },
          { model: IntakePeriod, as: 'intakePeriod' },
          { model: Mode, as: 'mode' }
        ]
      });
      if (!offering) return res.status(404).json({ error: 'Not found' });
      res.json(offering);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch course offering' });
    }
  },

  async update(req, res) {
    try {
      const offering = await CourseOffering.findByPk(req.params.id);
      if (!offering) return res.status(404).json({ error: 'Not found' });
      await offering.update(req.body);
      res.json(offering);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update course offering' });
    }
  },

  async delete(req, res) {
    try {
      const offering = await CourseOffering.findByPk(req.params.id);
      if (!offering) return res.status(404).json({ error: 'Not found' });
      await offering.destroy();
      res.json({ message: 'Deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete course offering' });
    }
  }
};
