const User = require("../models/auth");
const jwt = require("jsonwebtoken");
exports.signup = (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((user) => {
      // user.hashed_password = undefined;
      // user.salt = undefined;
      res.send(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send(err);
    });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(404).json("user not found with this email !");
    }
    if (!user.authentication(password)) {
      return res.status(401).send("Password incorrect");
    }
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("token", token, { expire: new Date() + 8062000 }); // Stocker token dans le coookie
    const { _id, name, email, role } = user;
    res.send({
      token,
      user: { _id, name, email, role },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.send({ message: "User is Sign Out" });
};
