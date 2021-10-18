const express = require("express");
const router = express.Router();
const {
  getUserById,
  updateUser,
  deleteUser,
  getUsers,
} = require("../controllers/userControllers");
const { userById, isAdmin } = require("../middlewares/user");

router.get("/getUser/:userId", getUserById);
router.put("/update/:userId", updateUser);
router.get("/getUsers/:userId", getUsers);
router.delete("/delete/:userId", isAdmin, deleteUser);

router.param("userId", userById);
module.exports = router;
