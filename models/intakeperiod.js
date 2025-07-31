'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IntakePeriod extends Model {
    static associate(models) {
      IntakePeriod.hasMany(models.CourseOffering);
    }
  }

  IntakePeriod.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'IntakePeriod',
  });

  return IntakePeriod;
};
