const { Router } = require("express");
const UserController = require("./controllers/user.controller");

const router = new Router();

router.post("/checkusername", UserController.checkUsername);
router.post("/updateuser", UserController.updateUser);
router.get("/:user_url/info", UserController.getUserInfo);

router.use("/:user_url/comments", UserController.getUserComments);

router.use("/:user_url/preferences", (req, res) => {
  res.send("preferences");
});

router.use("/:user_url/orders", (req, res) => {
  res.send("orders");
});

module.exports = router;
