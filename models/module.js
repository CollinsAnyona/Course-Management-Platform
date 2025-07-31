'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Module extends Model {
    static associate(models) {
      Module.hasMany(models.CourseOffering);
    }
  }

  Module.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Module',
  });

  return Module;
};
