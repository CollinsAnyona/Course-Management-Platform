'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toJSON() {
      const attributes = { ...this.get() };
      delete attributes.password; // Exclude password from JSON responses
      return attributes;
    }

    static associate(models) {
      // Associations can go here if needed later
    }

    async validPassword(password) {
      return await bcrypt.compare(password, this.password);
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['Admin', 'Manager', 'Facilitator']], // predefined roles
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate: async (user) => {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        },
        beforeUpdate: async (user) => {
          if (user.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
    }
  );

  return User;
};
