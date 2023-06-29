const bcrypt = require("bcryptjs");
const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../../config/keys");

module.exports.signUp = async function (req, res) {
  try {
    const { name, email, password } = req.body;

    //Find user by email
    let user = await User.findOne({ email: email });

    if (user) {
      return res.status(422).json({
        message: "user already in database",
        success: false,
      });
    }
    //Hash Password
    let salt = bcrypt.genSaltSync(10);
    let hashPassword = bcrypt.hashSync(password, salt);
    //User Create with Hash Password
    user = await User.create({
      name: name,
      email: email,
      password: hashPassword,
    });

    return res.status(200).json({
      message: "Sign Up successful, here is your token, please keep it safe!",
      success: true,
      data: {
        token: jwt.sign(user.toJSON(), JWT_SECRET, {
          expiresIn: "1000000",
        }),
        user: user,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err, success: false });
  }
};
//create session
module.exports.signIn = async function (req, res) {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Username ",
      });
    }
    //Password is match
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    return res.status(200).json({
      message: "Sign in successful, here is your token, please keep it safe!",
      success: true,
      data: {
        token: jwt.sign(user.toJSON(), JWT_SECRET, {
          expiresIn: "1000000",
        }),
        user: user,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err, success: false });
  }
};
