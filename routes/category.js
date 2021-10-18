const express = require("express");
const {
  createCategory,
  showcategory,
  getAllCategories,
  removeCategory,
  updateCategory,
} = require("../controllers/categoryControllers");
const { categoryById } = require("../middlewares/category");

const router = express.Router();
const { userById } = require("../middlewares/user");
router.post("/create/:userId", createCategory);
router.get("/:categoryId", showcategory);
router.get("/", getAllCategories);
router.delete("/delete/:categoryId/:userById", removeCategory);
router.put("/update/:categoryId/:userById", updateCategory);

router.param("userId", userById);
router.param("categoryId", categoryById);

module.exports = router;
