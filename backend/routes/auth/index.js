const { Router } = require("express");
const {
  signInController,
  signUpController,
  emailVerify,
  signOutController,
} = require("./controllers/auth.controllers");

const router = new Router();

router.post("/signin", signInController);

router.post("/signup", signUpController);

router.post("/emailverify", emailVerify);

router.post("/signout", signOutController);

module.exports = router;
