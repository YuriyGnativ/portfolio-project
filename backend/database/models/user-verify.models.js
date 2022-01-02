const { DataTypes } = require("sequelize");
const sequelize = require("..");

const UserVerify = sequelize.define(
  "user_veryfy",
  {
    username: {
      type: DataTypes.STRING,
      require: true,
    },
    email: {
      type: DataTypes.STRING,
      require: true,
    },
    referral_code: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = UserVerify;
