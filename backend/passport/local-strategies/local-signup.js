const LocalStrategy = require("passport-local");
const jwt = require("jsonwebtoken");
const { Users, UserVerify } = require("../../database/models");

const localSignUp = (Users) => () =>
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "verifyCode",
    },
    async (username, verifyCode, done) => {
      const candidate = await UserVerify.findOne({
        where: {
          referral_code: verifyCode,
        },
      }).catch((e) => {
        res.status(400).send({ success: false, msg: "Wrong verify code" });
      });

      try {
        const { username, url, email, referral_code } = candidate;
        const user = await Users.create({
          username,
          user_url: url,
          email,
          password_hash: referral_code,
        }).then((res) => res.get({ plain: true }));

        if (user) {
          const token = jwt.sign({ sub: url }, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "30h",
          });
          candidate.destroy();
          done(null, {
            userUrl: user.user_url,
            token,
            success: true,
            msg: "You're successfully signed up",
          });
        } else {
          done(null, { succecc: false, msg: "register failed" });
        }
      } catch (error) {
        console.log("error", error);
        done(error);
      }
    }
  );

module.exports = localSignUp(Users);
