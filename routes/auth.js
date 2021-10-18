const express = require("express");
const router = express.Router();
const { signin, signup, signout } = require("../controllers/authController");
const { signupValid } = require("../middlewares/signupValid");

router.post("/signin", signin);
router.post("/signup", signupValid, signup);
router.get("/signout", signout);

module.exports = router;
