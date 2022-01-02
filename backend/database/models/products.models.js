const { DataTypes } = require("sequelize");
const { Comments } = require(".");
const sequelize = require("..");

const Products = sequelize.define(
  "products",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    available: {
      type: DataTypes.BOOLEAN,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    url: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
    },
    product_type: {
      type: DataTypes.STRING,
    },
    color: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    maker: {
      type: DataTypes.STRING,
    },
    main_image: {
      type: DataTypes.STRING,
    },
    data: {
      type: DataTypes.JSONB,
    },
    image_set: {
      type: DataTypes.JSONB,
    },
  },
  {
    timestamps: false,
  }
);

// Products.hasMany(Comments)

module.exports = Products;
