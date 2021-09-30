const Product = require("../models/product");

const shortid = require("shortid");

exports.createProduct = (req, res) => {
  res.status(200).json({ file: req.files, body: req.body });
};
