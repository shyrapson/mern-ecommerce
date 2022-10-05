const { StatusCodes } = require("http-status-codes");
const Product = require("../models/Product");
const { BadRequest } = require("../errors");

//create product
const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const saveProduct = await newProduct.save();
    res.status(StatusCodes.OK).json(saveProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//update product
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.statUS(StatusCodes.OK).json(updatedProduct);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//delete product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json("product as been deleted");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//get product
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(StatusCodes.OK).json(product);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//get all products
const getAllProducts = async (req, res) => {
  const {
    query: { new: queryNew, category: queryCategory },
  } = req;

  try {
    let products;
    if (queryNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (queryCategory) {
      products = await Product.find({
        categories: {
          $in: [queryCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(StatusCodes.OK).json(products );
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json(err);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
};
