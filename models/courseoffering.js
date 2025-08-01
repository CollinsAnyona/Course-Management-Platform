'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CourseOffering extends Model {
    static associate(models) {
      CourseOffering.belongsTo(models.Course, {
        foreignKey: { name: 'courseId', field: 'courseId' },
        as: 'course'
      });
      CourseOffering.belongsTo(models.Facilitator, {
        foreignKey: { name: 'facilitatorId', field: 'facilitatorId' },
        as: 'facilitator'
      });
      CourseOffering.belongsTo(models.Cohort, {
        foreignKey: { name: 'cohortId', field: 'cohortId' },
        as: 'cohort'
      });
      CourseOffering.belongsTo(models.Class, {
        foreignKey: { name: 'classId', field: 'classId' },
        as: 'class'
      });
      CourseOffering.belongsTo(models.IntakePeriod, {
        foreignKey: { name: 'intakePeriodId', field: 'intakePeriodId' },
        as: 'intakePeriod'
      });
      CourseOffering.belongsTo(models.Mode, {
        foreignKey: { name: 'modeId', field: 'modeId' },
        as: 'mode'
      });
    }
  }

  CourseOffering.init({
    trimester: DataTypes.STRING,
    courseId: DataTypes.INTEGER,
    facilitatorId: DataTypes.INTEGER,
    cohortId: DataTypes.INTEGER,
    classId: DataTypes.INTEGER,
    intakePeriodId: DataTypes.INTEGER,
    modeId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'CourseOffering',
  });
  

  return CourseOffering;
};
