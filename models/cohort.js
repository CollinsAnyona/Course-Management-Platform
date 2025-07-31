'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cohort extends Model {
    static associate(models) {
      Cohort.hasMany(models.CourseOffering);
    }
  }

  Cohort.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cohort',
  });

  return Cohort;
};
