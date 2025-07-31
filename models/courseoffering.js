'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CourseOffering extends Model {
    static associate(models) {
      CourseOffering.belongsTo(models.Module, {
        foreignKey: 'moduleId',
        as: 'module'
      });
      CourseOffering.belongsTo(models.Facilitator, {
        foreignKey: 'facilitatorId',
        as: 'facilitator'
      });
      CourseOffering.belongsTo(models.Cohort, {
        foreignKey: 'cohortId',
        as: 'cohort'
      });
      CourseOffering.belongsTo(models.Class, {
        foreignKey: 'classId',
        as: 'class'
      });
      CourseOffering.belongsTo(models.IntakePeriod, {
        foreignKey: 'intakePeriodId',
        as: 'intakePeriod'
      });
      CourseOffering.belongsTo(models.Mode, {
        foreignKey: 'modeId',
        as: 'mode'
      });
    }
  }

  CourseOffering.init({
    moduleId: DataTypes.INTEGER,
    classId: DataTypes.INTEGER,
    cohortId: DataTypes.INTEGER,
    intakePeriodId: DataTypes.INTEGER,
    modeId: DataTypes.INTEGER,
    facilitatorId: DataTypes.INTEGER,
    trimester: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CourseOffering',
  });

  return CourseOffering;
};
