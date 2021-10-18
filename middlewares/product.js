const Product = require("../models/product");

exports.producatById = (req, res, next, id) => {
  // Product.findById(id, (err, product) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(404).json({ error: "Product not found" });
      }
      req.product = product;
      next();
    });
};
