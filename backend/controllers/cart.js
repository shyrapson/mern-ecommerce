const { StatusCodes } = require("http-status-codes");
const Cart = require("../models/Cart");
const { BadRequest } = require("../errors");

//create Cart
const createCart = async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const saveCart = await newCart.save();
    res.status(StatusCodes.OK).json(saveCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//update Cart
const updateCart = async (req, res) => {
  try {
    const updatedCart = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.statUS(StatusCodes.OK).json(updatedCart);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//delete Cart
const deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json("Cart item has been deleted");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//get user Cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({userId:req.params.userId});
    res.status(StatusCodes.OK).json(cart);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//get all 
const getAllCarts = async (req, res) => {


  try {
 
 const carts = await Cart.find({})
    res.status(StatusCodes.OK).json( carts );
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json(err);
  }
};



module.exports = {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  getAllCarts,
};
