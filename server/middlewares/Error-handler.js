const {CustomApiError} = require("../errors");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {

  if(err instanceof CustomApiError){
    return res.status(err.statusCode).json({msg: err.message});
  }
  return res
  .status(StatusCodes.INTERNAL_SERVER_ERROR)
  .send('Something went wrong try again later')
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
     msg: "something went wrong try again later",
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
