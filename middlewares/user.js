const User = require("../models/auth");
const jwt = require("jsonwebtoken");
const { Console } = require("console");

exports.userById = (req, res, next, id) => {
  User.findById(id)
    .select("-hashed_password")
    .select("-salt")
    .exec((err, user) => {
      if (err || !user) {
        return res.status(404).send({ error: "user not found" });
      }
      req.profile = user;
      next();
    });
};

exports.isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "not authenticated" });
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message || "could not decode the token" });
  }
  if (!decodedToken) {
    res.status(401).json({ message: "unauthorized" });
  } else {
    // console.log(decodedToken);
    // res.status(200).json({ message: "here is your resource" });
    next();
  }
};

exports.isAdmin = (req, res, next) => {
  // console.log(req.headers);
  if (!req.profile.role) {
    return res.status(403).json("Admin ressources, Access Denied");
  }
  next();
};
