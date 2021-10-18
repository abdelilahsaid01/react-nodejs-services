const Product = require("../models/product");
const fs = require("fs"); // Biblio de expressJS
const Joi = require("joi");
const _ = require("lodash");
const formidable = require("formidable");
exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtention = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(400).json({ err: "Image could not uploaded" });
    }
    let product = new Product(fields);
    if (files.photo) {
      if (files.photo.size > Math.pow(10, 10)) {
        return res.status(400).json({ error: "Image should be less" });
      }
      product.photo.data = fs.readFileSync(files.photo.path); // Lire le chemin de l'image
      product.photo.contentType = files.photo.type;
    }
    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      // price: Joi.number().required(),
      // quantity: Joi.number().required(),
      category: Joi.string().required(),
    });
    const { error, value } = schema.validate(fields);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    product.save((err, product) => {
      if (err) {
        return res.status(400).json({ error: "Bad Request" });
      }
      return res.send(product);
    });
  });
};

exports.showProduct = (req, res) => {
  // req.product.photo=undefined
  return res.send({
    product: req.product,
  });
};

exports.removeProduct = (req, res) => {
  let product = req.product;
  product.remove(product, (err) => {
    if (err) {
      res.status(404).json({ error: "Product not found" });
    }
    res.status(204).json({});
  });
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtention = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(400).json({ err: "Image could not uploaded" });
    }
    let product = req.product;
    product = _.extend(product, fields);
    if (files.photo) {
      if (files.photo.size > Math.pow(10, 10)) {
        return res.status(400).json({ error: "Image should be less" });
      }
      product.photo.data = fs.readFileSync(files.photo.path); // Lire le chemin de l'image
      product.photo.contentType = files.photo.type;
    }
    // const schema = Joi.object({
    //   name: Joi.string().required(),
    //   decription: Joi.string().required(),
    //   category: Joi.string().required(),
    // });
    // const { error, value } = schema.validate(fields);
    // if (error) {
    //   return res.status(400).json({ error: error.details[0].message });
    // }

    product.save((err, product) => {
      if (err) {
        return res.status(400).json({ error: "Bad Request" });
      }
      return res.send(product);
    });
  });
};

exports.allProducts = (req, res) => {
  console.log(req.query);
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let ordre = req.query.order ? req.query.order : "asc";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  let query = {};
  let { search, category } = req.query;
  if (search) {
    query.search = { $regex: search, $option: "i" };
  }
  if (category) {
    query.category = category;
  }
  Product.find(query)
    .select("-photo")
    .populate("category") // Object ID
    .sort([[sortBy, ordre]])
    .limit(limit)
    .exec((err, product) => {
      if (err) {
        res.status(404).json({ error: "Product not found", err });
      }
      console.log(product);
      return res.send(product);
    });
};

exports.relatedProduct = (req, res) => {
  console.log("hhhhhhh");
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  Product.find({
    // Condition
    category: req.product.category,
    _id: { $ne: req.product._id }, // Not equale
  })
    .select("-photo")
    // .populate("category", "_id name")
    .limit(limit)
    .exec((err, product) => {
      if (err) {
        res.status(404).json({ error: "Product not found", err });
      }
      return res.send(product);
    });
};

exports.searchProduct = (req, res) => {
  let sortBy = req.query.sort ? req.query.sort : "_id";
  let ordre = req.query.ordre ? req.query.ordre : "asc";
  let limit = req.body.limit ? parseInt(req.body.limit) : 5;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let findArgs = {};
  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }
  Product.find(findArgs)
    .select("-photo")
    .populate("category") // Object ID
    .sort([[sortBy, ordre]])
    .limit(limit)
    .skip(skip)
    .exec((err, product) => {
      if (err) {
        res.status(404).json({ error: "Product not found", err });
      }
      console.log(product);
      return res.send(product);
    });
};
exports.photoProduct = (req, res) => {
  const { data, contentType } = req.product.photo;
  if (!data) {
    return res.status(404).json("image not found");
  }
  res.set("Content-Type", contentType);
  res.send(data);
};
