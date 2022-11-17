const { StatusCodes } = require("http-status-codes");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const { BadRequest } = require("../errors");

//create Order
const createOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const saveOrder = await newOrder.save();
    res.status(StatusCodes.OK).json(saveOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//update Order
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.statUS(StatusCodes.OK).json(updatedOrder);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//delete Order
const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json("Order as been deleted");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//get user Orders
const getOrder = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(StatusCodes.OK).json(orders);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//get all Orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(StatusCodes.OK).json(orders);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json(err);
  }
};

//Get Monthly Income
const getMonthlyIncome = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      { $group: { _id: "$month", total: { $sum: "$sales" } } },
    ]);
    res.status(StatusCodes.OK).json(income);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json(err);
  }
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrders,
  getMonthlyIncome,
};
