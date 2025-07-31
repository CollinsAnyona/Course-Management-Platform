module.exports = (sequelize, DataTypes) => {
    const ActivityTracker = sequelize.define('ActivityTracker', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      weekNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 52,
        },
      },
      allocationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      attendance: {
        type: DataTypes.ARRAY(DataTypes.BOOLEAN),
        defaultValue: [],
        allowNull: false,
      },
      formativeOneGrading: {
        type: DataTypes.ENUM('Done', 'Pending', 'Not Started'),
        defaultValue: 'Not Started',
      },
      formativeTwoGrading: {
        type: DataTypes.ENUM('Done', 'Pending', 'Not Started'),
        defaultValue: 'Not Started',
      },
      summativeGrading: {
        type: DataTypes.ENUM('Done', 'Pending', 'Not Started'),
        defaultValue: 'Not Started',
      },
      courseModeration: {
        type: DataTypes.ENUM('Done', 'Pending', 'Not Started'),
        defaultValue: 'Not Started',
      },
      intranetSync: {
        type: DataTypes.ENUM('Done', 'Pending', 'Not Started'),
        defaultValue: 'Not Started',
      },
      gradeBookStatus: {
        type: DataTypes.ENUM('Done', 'Pending', 'Not Started'),
        defaultValue: 'Not Started',
      }
    }, {
      tableName: 'activity_trackers',
      timestamps: true,
    });
  
    // Define associations here
    ActivityTracker.associate = (models) => {
      ActivityTracker.belongsTo(models.CourseOffering, {
        foreignKey: 'allocationId',
        as: 'courseAllocation'
      });
    };
  
    return ActivityTracker;
  };
  