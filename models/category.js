const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 32,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

exports = mongoose.model("Category", categorySchema);
