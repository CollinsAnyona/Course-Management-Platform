'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mode extends Model {
    static associate(models) {
      Mode.hasMany(models.CourseOffering);
    }
  }

  Mode.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Mode',
  });

  return Mode;
};
