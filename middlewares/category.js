const Category = require("../models/category");
exports.categoryById = (req, res, next, id) => {
  Category.findById(id, (err, category) => {
    if (err || !category) {
      return res.status(404).send({ error: "category not found" });
    }
    req.category = category;
    next();
  });
};
