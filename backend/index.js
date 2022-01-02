require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const sequelize = require("./database");
const { localSignUp, localSignIn } = require("./passport/local-strategies");
const router = require("./routes");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

passport.use("local-signup", localSignUp());
passport.use("local-signin", localSignIn());
app.use("/api", router);

const start = async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ force: true });
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
