const LocalStrategy = require("passport-local");
const jwt = require("jsonwebtoken");
const { Users } = require("../../database/models");
const bcrypt = require("bcrypt");
const { or } = require("sequelize");

const localSignIn = (Users) => () =>
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await Users.findOne({
        where: or({ username }, { email: username }),
      });

      if (!user) {
        done({
          success: false,
          msg: "Such user doesn't exist. You should signup.",
        });
      }
      const checked = await bcrypt.compare(password, user.password_hash);
      if (!checked) {
        done({ success: false, msg: "Incorrect password" });
      }
      done(null, {
        success: true,
        msg: "All green",
        token: jwt.sign({ sub: user.user_url }, process.env.JWT_ACCESS_SECRET),
        userUrl: user.user_url,
      });
    } catch (error) {
      console.error(error);
      done({ msg: "something went wrong" });
    }
  });

module.exports = localSignIn(Users);
