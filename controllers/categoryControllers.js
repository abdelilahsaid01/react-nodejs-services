const Category = require("../models/category");
exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({ error: "Bad Request" });
    }
    return res.send(category);
  });
};

exports.showcategory = (req, res) => {
  return res.send({
    category: req.category,
  });
};
exports.removeCategory = (req, res) => {
  let category = req.category;
  category.remove(category, (err) => {
    if (err) {
      res.status(404).json({ error: "category not found" });
    }
    res.status(204).json({});
  });
};
exports.getAllCategories = (req, res) => {
  Category.find((err, category) => {
    if (err || !category.length) {
      return res.status(404).json({ error: "category not found" });
    }
    res.status(200).json({ category });
  });
};

exports.updateCategory = (req, res) => {
  Category.updateOne(req.category, req.body, (err, data) => {
    if (err) {
      return res.status(400).json({ error: "Bad request" });
    }
    res.status(200).json({ data });
  });
};
