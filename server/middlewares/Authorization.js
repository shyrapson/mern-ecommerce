const jwt = require("jsonwebtoken");

const { UnauthenticatedError } = require("../errors");

const AuthenticationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication Invalid");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const { userId, isAdmin } = payload;
    req.user = { userId, isAdmin };

    next();
  } catch (error) {
    console.log(error);
  }
};
const verifyTokenandAuthorization = (req, res, next) => {


    if (req.user.id === req.params.id || req.user.isAdmin) {
      return next();
    } else {
      res.status(401)
      throw new UnauthenticatedError(
        "You are not allowed to access this page."
      );
    }
};

const admin = (req, res, next) => {
    console.log(req.user, "biges");
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(401)
      throw new UnauthenticatedError(
        "You are not allowed to access this page."
      );
    }
  

}
module.exports = {
  AuthenticationMiddleware,
  verifyTokenandAuthorization,
  admin
}
