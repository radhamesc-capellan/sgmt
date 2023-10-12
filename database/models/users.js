"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      
      //association
      Users.hasOne(models., {
        as: "",
        foreignKey: "id_user",
      });
      Users.hasOne(models.Applications, {
        as: "",
        foreignKey: "id_user",
      });

    }
  }
  Users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      username : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      token: {
        type: DataTypes.TEXT,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Users",
      tableName: "users",
      underscored: true,
      timestamps: true,
      scopes: {
        view_public: { attributes: ["id"] },
        view_same_user: { attributes: ["id", "email"] },
        auth_flow: { attributes: ["id", "email"] },
        view_me: { attributes: ["id", "email"] },
      },
      hooks: {
        beforeCreate: (user, options) => {
          if (user.email) {
            let emailLowercase = String(user.email).toLocaleLowerCase();
            user.email = emailLowercase;
          }
        },
      },
    }
  );
  return Users;
};