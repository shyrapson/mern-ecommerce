const router = require("express").Router();
const {
  verifyTokenandAuthorization,
  AuthenticationMiddleware,
  admin,
} = require("../middlewares/Authorization");
const {createProduct,updateProduct,deleteProduct,getProduct,getAllProducts} = require("../controllers/product");

router.route("/").post(AuthenticationMiddleware, admin, createProduct);
router.route("/:id").patch(AuthenticationMiddleware, admin, updateProduct);
router.route("/:id").patch(AuthenticationMiddleware, admin, deleteProduct);
router.route("/find/:id").get(AuthenticationMiddleware, getProduct);
router.route("/").get(AuthenticationMiddleware, getAllProducts);

module.exports = router;
