const mongoose = require("mongoose");
const uuid = require("uuid"); // version 1 est recommandé
const crypto = require("crypto");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 50,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      maxLength: 50,
      trim: true,
      required: true,
      unique: true,
    },
    hashed_password: {
      // Password should be hashed
      type: String,
      required: true,
    },
    salt: {
      type: String,
      trim: true,
    },
    about: {
      type: String,
      trim: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true } // enable create and update in db
);

userSchema
  .virtual("password") // Champ virtuel "password" visible au client qui va etre emplacé par hashed_password au db
  .set(function (password) {
    this._password = password;
    this.salt = uuid.v1();
    this.hashed_password = this.cryptPassword(password); // Crypter le password
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authentication: function (password) {
    return this.cryptPassword(password) === this.hashed_password;
  },
  cryptPassword: function (password) {
    // Methode virtuelle
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex"); // hasher le password
    } catch (error) {
      return error;
    }
  },
};
module.exports = mongoose.model("User", userSchema);
