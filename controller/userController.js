const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');

const userRegister = async (req,res) => {
    try {
        const { username, email, password } = req.body;
        console.log(req.body);
    
        const exists = await userModel.findOne({ email: email });
        if (exists) {
          return res
            .status(200)
            .json({ exists: true, message: "EMAIL ALREADY EXISTS" });
        }
    
        const newUser = new userModel({
          username: username,
          email: email,
          password: password
        });
    
        await newUser.save();
        res
          .status(200)
          .json({
            message: "REGISTRATION SUCCESSFULL", created:true
          });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message, created: false });
      }
};

const userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const userData = await userModel.findOne({ email: email });
      console.log("vanno1");
      if (!userData) {
        return res.status(404).json({ message: "invalid email", login: false });
      }
  
      const isMatch = await userModel.findOne({
        email: email,
        password: password,
      });
      
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "invalid passowrd", login: false });
      }  else {
        const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET, {
          expiresIn: 300000,
        });
        res
          .status(200)
          .json({ login: true, message: "login successful", userData:userData, token });
      }
    } catch (error) {
      console.log(error.message); 
      res.status(500).json({ error: error.message, login: false });
    }
  };

  const isUserAuth = async (req, res) => {
    try {
      const userData = await userModel.findOne({ _id: req.userId }).lean();
      if (!userData) {
        return res
          .status(404)
          .json({ message: "USER DOES NOT EXISTS", success: false });
      } else {
        delete userData.password;
        return res.status(200).json({ success: true, userData: userData });
      }
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false });
    }
  };

module.exports = {
    userRegister,
    userLogin,
    isUserAuth
}