const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 32,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      //   maxLength: 100,
    },
    category: {
      type: ObjectId,
      ref: "Category", // Nom de la collection (One to many)
    },

    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
  // price: {
  //     type: Number,
  //     required: true,
  // },
  // shipping: {
  //   type: Boolean,
  //   default: false,
  // },
);

module.exports = mongoose.model("Product", productSchema);
