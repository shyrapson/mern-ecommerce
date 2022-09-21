
const router = require("express").Router();
const {
  verifyTokenandAuthorization,
  AuthenticationMiddleware,
  admin,
} = require("../middlewares/Authorization");
const {createOrder,updateOrder,deleteOrder,getOrder,getAllOrders,getMonthlyIncome} = require("../controllers/Order");

router.route("/").post(AuthenticationMiddleware, createOrder);
router.route("/:id").patch(AuthenticationMiddleware,  admin, updateOrder);
router.route("/:id").patch(AuthenticationMiddleware,  admin, deleteOrder);
router.route("/find/:userId").get(AuthenticationMiddleware, verifyTokenandAuthorization, getOrder);
router.route("/").get(AuthenticationMiddleware,admin, getAllOrders);
router.route("/income").get(AuthenticationMiddleware,admin, getMonthlyIncome);

module.exports = router;
