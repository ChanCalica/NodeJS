const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    if (newUser) {
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'User registration failed',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Some error occurred! Please try again',
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User does not exist',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '60m' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Some error occurred! Please try again',
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, {
      _id: 0,
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
      password: 0,
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Some error occurred! Please try again',
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find(
      {},
      { _id: 0, __v: 0, createdAt: 0, updatedAt: 0, password: 0 }
    );
    if (users?.length > 0) {
      return res.status(200).json({
        success: true,
        message: 'Users fetched successfully',
        users,
      });
    }
    res.status(404).json({
      success: false,
      message: 'User not found',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Some error occurred! Please try again',
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // user.remove();
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Some error occurred! Please try again',
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.userInfo.userId;

    const { oldPassword, newPassword } = req.body;
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Some error occurred! Please try again',
    });
  }
};

module.exports = { register, login, getUser, getUsers, deleteUser };
