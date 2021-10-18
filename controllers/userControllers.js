const User = require("../models/auth");
const uuid = require("uuid"); // version 1 est recommandé
const crypto = require("crypto");
exports.getUserById = (req, res) => {
  if (!req.profile) return res.status(404).json({ user: "user not found" });
  res.status(200).json(req.profile);
};
exports.updateUser = (req, res) => {
  console.log(req.body);
  if (req.body.password) {
    req.body.salt = uuid.v1();
    req.body.hashed_password = crypto
      .createHmac("sha1", req.body.salt)
      .update(req.body.password)
      .digest("hex");
  }
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(404).json(err);
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      return res.send(user);
    }
  );
};
exports.deleteUser = (req, res) => {
  User.deleteOne({ _id: req.profile._id }, (err, user) => {
    if (err) return res.status(404).json({ user: "user can not be deleted" });
    res.status(200).send("");
  });
};

exports.getUsers = (req, res) => {
  User.find()
    .select(["-hashed_password", "-salt"])
    .exec((err, user) => {
      if (err) return res.status(404).json({ user: "no user" });
      res.status(200).json(user);
    });
};
