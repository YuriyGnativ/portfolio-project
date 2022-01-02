const passport = require("passport");
const nodemailer = require("nodemailer");
const { Users, UserVerify } = require("../../../database/models");
const { Op } = require("sequelize");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");
const ObjectID = require("bson-objectid");

class authController {
  signInController = async (req, res, next) => {
    // res.send("sign in");
    return passport.authenticate("local-signin", (error, userData) => {
      if (error !== null) {
        return res.json({
          ...error,
        });
      }
      return res.json(userData);
    })(req, res, next);
  };
  signOutController = async (req, res, next) => {
    res.send("sign out...");
  };
  signUpController = async (req, res, next) => {
    const { email, password, username } = req.body;
    if (!validator.isEmail(email)) {
      res.send({ success: false, msg: "Enter valid email." });
    } else if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 2,
        minSymbols: 0,
      })
    ) {
      res.send({ success: false, msg: "Password isn't strong enough" });
    } else {
      const userCheck = await Users.findOne({
        where: {
          [Op.or]: [{ email }, { username }],
        },
      });
      if (!userCheck) {
        // user doesn't exist
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const objid = ObjectID().toString();
        // const referral_code = ObjectID().toString();
        // const referral_code = v4();

        const [candidate, created] = await UserVerify.findOrCreate({
          where: {
            email,
          },
          defaults: {
            username,
            email,
            referral_code: hashedPassword,
            url: objid,
          },
        });
        if (!created) {
          res.json({ success: false, msg: "message already sent" });
          return;
        }
        const transporter = nodemailer.createTransport({
          service: "Gmail",
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_USER_PASSWORD,
          },
        });

        let info = await transporter
          .sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: "Account activation",
            text: "",
            html: `
            <div>
              <h1>Confirm your email</h1>
              code: ${candidate.referral_code}
            </div>
          `,
          })
          .catch((error) => {
            console.log("error: ", error);
          });
        res.send({ success: true });
      } else {
        res.send({
          success: false,
          msg: "User with such email or username already exists",
        });
      }
    }
  };
  emailVerify = async (req, res, next) => {
    const candidate = await UserVerify.findOne({
      where: {
        referral_code: req.body.verifyCode,
      },
    });
    if (candidate) {
      req.body.username = candidate.username;
      return passport.authenticate("local-signup", (error, userData) => {
        if (error !== null) {
          return res.json(error);
        }
        return res.json(userData);
      })(req, res, next);
    } else {
      res.send({ success: false, msg: "Wrong referral code" });
    }
  };
}

module.exports = new authController();
