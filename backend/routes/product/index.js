const { Router } = require("express");
const ProductController = require("./controllers/product.controller");

const router = new Router();
const productController = new ProductController();

router.get("/search", productController.searchProduct);
router.get("/p/:cathegory/filters", productController.getFilters);
router.get("/p/:cathegory", productController.getProductsGrid);
router.get("/:url/comments", productController.getProductComments);
router.get("/:url/topcomments", productController.getProductTopcomments);
router.get("/:url/stats", productController.getProductStats);
router.get("/:url/photos", productController.getProductPhotos);
router.get("/:url", productController.getProductProfile);

module.exports = router;
