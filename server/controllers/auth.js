const { StatusCodes } = require("http-status-codes");
const {UnauthenticatedError} = require("../errors");
const {BadRequest} = require("../errors");
const User = require("../models/User");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(200).json({ user: { name: user.username }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, "email");
  if (!email || !password) {
    throw new BadRequest("please provide username and email");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  console.log(isPasswordCorrect, "password");
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();

  
  console.log(token, "token");

  console.log(user, "end user");
  res.status(StatusCodes.OK).json({ user: { name: user.username }, token });
};

module.exports = { register, login };
