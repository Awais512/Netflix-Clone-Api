const User = require('../models/User');
const CryptoJS = require('crypto-js');

const register = async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASSWORD_SECRET
      ).toString(),
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

const login = async () => {};

module.exports = { register, login };
