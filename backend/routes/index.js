const { Router } = require("express");

const productRoutes = require("./product");
const authRoutes = require("./auth");
const userRoutes = require("./user");

const router = new Router();

router.use("/auth", authRoutes);
router.use("/product", productRoutes);
router.use("/user", userRoutes);

module.exports = router;
