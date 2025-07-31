'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    static associate(models) {
      Class.hasMany(models.CourseOffering);
    }
  }

  Class.init({
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Class',
  });

  return Class;
};
