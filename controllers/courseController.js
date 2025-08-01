const { Course } = require('../models');

exports.createCourse = async (req, res) => {
  try {
    const { name, code } = req.body;

    const course = await Course.create({
      title: name,
      description: code
    });

    res.status(201).json(course);
  } catch (error) {
    console.error('🔥 Course creation failed:', error); // Log exact error
    res.status(500).json({ error: 'Failed to create course' });
  }
};

