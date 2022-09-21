
const router = require("express").Router();
const {
  verifyTokenandAuthorization,
  AuthenticationMiddleware,
  admin,
} = require("../middlewares/Authorization");
const {createCart,updateCart,deleteCart,getCart,getAllCarts} = require("../controllers/Cart");

router.route("/").post(AuthenticationMiddleware, createCart);
router.route("/:id").patch(AuthenticationMiddleware,  verifyTokenandAuthorization, updateCart);
router.route("/:id").patch(AuthenticationMiddleware,  verifyTokenandAuthorization, deleteCart);
router.route("/find/:userId").get(AuthenticationMiddleware, verifyTokenandAuthorization, getCart);
router.route("/").get(AuthenticationMiddleware,admin, getAllCarts);

module.exports = router;
