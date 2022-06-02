const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { SECRET } = require("../config");

/**
 * @DESC To register the user (USER)
 */

const userRegister = async (userDets, role, res) => {
  try {

    // validate the email
    let emailNotRegistered = await validateEmail(userDets.email);
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: `Email is already registered.`,
        success: false
      });
    }

    // Get the hashed password
    const password = await bcrypt.hash(userDets.password, 12);
    // create a new user
    const newUser = new User({
      ...userDets,
      password,
      role
    });

    const saveUser = await newUser.save();
    return res.status(201).json({
      message: "Hurry! now you are successfully registred. Please now login.",
      success: true
    });
  } catch (err) {
    // Implement logger function (winston)
    return res.status(500).json({
      message: "Unable to create your account.",
      success: false
    });
  }
};

/**
* @DESC To Login the user (USER)
*/

const userLogin = async (userCreds, role, res) => {
  let { email, password } = userCreds;
  // First Check if the username is in the database
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User email is not found. Invalid login credentials.",
      success: false
    });
  }

  // That means user is existing and trying to signin fro the right portal
  // Now check for the password
  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    // Sign in the token and issue it to the user
    let token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        email: user.email
      },
      SECRET,
      { expiresIn: "7 days" }
    );

    let result = {
      role: user.role,
      email: user.email,
      token: `Bearer ${token}`,
      expiresIn: 168
    };

    return res.status(200).json({
      ...result,
      message: "Hurray! You are now logged in.",
      success: true
    });
  } else {
    return res.status(403).json({
      message: "Incorrect password.",
      success: false
    });
  }
};


const validateEmail = async email => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

module.exports = { userRegister,userLogin };