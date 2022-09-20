const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const { BadRequest } = require("../errors");

//Get user
const getUser = async (req, res) => {
  const {
    params: { id: userId },
  } = req;

  const user = await User.findById(userId.trim());

  if (!user) {
    throw new BadRequest(`no such user with id ${userId.trim()}`);
  }
  // const {...others,password} = user
  res.status(StatusCodes.OK).json({ user });
};
//Get all user
const getAllUser = async (req, res) => {
  const query = req.query.new;

  const user = query
    ? await User.find().sort({ _id: -1 }).limit(5)
    : await User.find();

  if (!user) {
    throw new BadRequest("");
  }

  res.status(StatusCodes.OK).json({ user });
};
//update User
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id.trim(),
      { $set: req.body },
      { new: true, runValidators: true }
    );

    // console.log(req.user, "userin");

    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    console.log(error);
  }
};

//Delete user
const deleteUser = async (req, res) => {
  const {
    params: { id: userId },
  } = req;
  const user = await User.findOneAndRemove(userId.trim());
  if (!user) {
    throw new BadRequest(`no such user with id ${userId.trim()}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

//Get User Stats
const getUserStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  const data = await User.aggregate([
    { 
      $match: { createdAt: { $gte: lastYear } } 
    },
    { $project: { month: { $month: "$createdAt" } } },
    //sum every register user stat, _id will be month createAt
    { $group: { _id: "$month", total: { $sum: 1 } } },
  ]);
  if (!data) {
    throw new BadRequest(
      "stats cannot be aggregated because it is not available"
    );
  }
  res.status(StatusCodes.OK).json(data);
};

module.exports = { updateUser, deleteUser, getUser, getAllUser, getUserStats };
