const { Module } = require('../models');

exports.createModule = async (req, res) => {
  try {
    const { name, code } = req.body;
    const module = await Module.create({ name, code });
    res.status(201).json(module);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create module', details: err.message });
  }
};
