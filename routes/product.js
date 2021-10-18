const express = require("express");
const {
  showProduct,
  allProducts,
  photoProduct,
  relatedProduct,
  createProduct,
  searchProduct,
  updateProduct,
  removeProduct,
} = require("../controllers/productControllers");
const { producatById } = require("../middlewares/product");
const { userById } = require("../middlewares/user");
const router = express.Router();

router.get("/:productId", showProduct);
router.get("/", allProducts);
router.get("/photo/:productId", photoProduct);
router.get("/related/:productId", relatedProduct);
router.post("/create/:userId", createProduct);
router.post("/searchProduct", searchProduct); // Multicritaire
router.delete("/:productId/:userId", removeProduct);
router.put("/:productId/:userId", updateProduct);
router.param("userId", userById);
router.param("productId", producatById);
module.exports = router;
