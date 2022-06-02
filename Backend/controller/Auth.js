const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

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
  
      await newUser.save();
      return res.status(201).json({
        message: "Hurry! now you are successfully registred. Please nor login.",
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
  
  const validateEmail = async email => {
    let user = await User.findOne({ email });
    return user ? false : true;
  };
  
  module.exports = { userRegister};