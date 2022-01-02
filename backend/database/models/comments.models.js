const sequelize = require("..");
const { DataTypes } = require("sequelize");
const Products = require("./products.models");
const Users = require("./users.models");

const Comments = sequelize.define(
  "comments",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    inner_text: {
      type: DataTypes.STRING,
    },
    likes: {
      type: DataTypes.INTEGER,
    },
    dislikes: {
      type: DataTypes.INTEGER,
    },
    subcomments: {
      type: DataTypes.JSONB,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

Comments.belongsTo(Products, {
  targetKey: "url",
  foreignKey: {
    name: "product_url",
  },
  as: "url",
});

Comments.belongsTo(Users, {
  targetKey: "user_url",
  foreignKey: {
    name: "user_url",
  },
});

module.exports = Comments;
