const { DataTypes } = require("sequelize");
const sequelize = require("..");

const Users = sequelize.define(
  "users",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    user_url: {
      type: DataTypes.STRING,
      unique: true,
    },

    gender: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
    dob: {
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    lang: {
      type: DataTypes.STRING,
      defaultValue: "English",
    },
    address: {
      type: DataTypes.STRING,
    },
    is_premium: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Users;
