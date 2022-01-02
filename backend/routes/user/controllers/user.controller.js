const { Users } = require("../../../database/models");
const { Comments } = require("../../../database/models");
const jwt = require("jsonwebtoken");

class UserController {
  updateUser = async (req, res) => {
    const { firstName, lastName, address, dob, lang, gender, username } =
      req.body;
    try {
      const token = req.headers?.authorization?.split(" ")[1];
      console.log("token", token);
      const { sub } = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      const user = await Users.findOne({
        where: {
          user_url: sub,
        },
      });
      if (user) {
        const updated = await user
          .update({
            first_name: firstName || undefined,
            last_name: lastName || undefined,
            dob: dob || undefined,
            address: address || undefined,
            lang: lang || undefined,
            gender: gender || undefined,
            username: username || undefined,
          })
          .catch((err) =>
            res.send({ success: false, msg: "not updated", err })
          );
        const updatedUser = {
          firstName: updated.first_name,
          lastName: updated.last_name,
          dob: updated.dob,
          address: updated.address,
          lang: updated.lang,
          gender: updated.gender,
          userUrl: updated.user_url,
          username: updated.username,
          email: updated.email,
        };
        console.log("updated", updatedUser);
        res.send({
          success: true,
          msg: "All good",
          token,
          user: updatedUser,
        });
      } else {
        res.send({ success: false, msg: "Something went wrong" });
      }
    } catch (error) {
      console.log("token error:", error);
      res.send({ success: false, msg: "token is corrupted" });
    }
  };

  checkUsername = async (req, res) => {
    const { username } = req.body;
    if (username.length < 5) {
      res.json({
        success: false,
        msg: "Username is too short",
      });
    } else {
      const candidate = await Users.findOne({
        where: {
          username,
        },
      });

      if (!candidate) {
        res.json({
          success: true,
          msg: "all green",
        });
      } else {
        res.json({
          success: false,
          msg: "Such user already exists",
        });
      }
    }
  };

  getUserInfo = async (req, res) => {
    const { user_url } = req.params;
    const userInfo = await Users.findOne({
      raw: true,
      where: {
        user_url,
      },
    });
    res.json({ ...userInfo });
  };

  getUserComments = async (req, res) => {
    const { user_url } = req.params;
    const userComments = await Comments.findAll({
      where: {
        user_url,
      },
    });
    res.send(userComments);
  };
}

module.exports = new UserController();
