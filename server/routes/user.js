const router = require("express").Router();
const {
  verifyTokenandAuthorization,
  AuthenticationMiddleware,
  admin,
} = require("../middlewares/Authorization");



const { updateUser, deleteUser, getUser,getAllUser,getUserStats } = require("../controllers/user");

router.route("/:id").delete(AuthenticationMiddleware,deleteUser);
router.route("/:id").patch( AuthenticationMiddleware,updateUser);
router.route("/find/:id").get(AuthenticationMiddleware,admin, getUser);
router.route("/stats").get(AuthenticationMiddleware,verifyTokenandAuthorization,getUserStats)
router.route("/").get(getAllUser)

module.exports = router;
