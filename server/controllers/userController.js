const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();

  if (!users) {
    return res.status(400).json({
      message: "No users found.",
    });
  }

  return res.json(users);
});

// @desc Create all users
// @route POST /users
// @access Private
const createUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body;

  // Confirm data
  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({
      message: "All fields must be required.",
    });
  }

  // Check for duplicate
  const duplicate = User.findOne({ username }).lean().exec();

  if (duplicate) {
    return res.status(409).json({
      message: "This username already exists.",
    });
  }

  // Hash Password
  const hashPwd = await bcrypt.hash(password, 10);

  const userObj = await User.create({
    username,
    password: hashPwd,
    roles,
  });

  // Create new user and save
  if (userObj) {
    return res.status(201).json({
      message: `New user ${username} created.`,
    });
  } else {
    return res.status(400).json({
      message: `Invalid user data received.`,
    });
  }
});

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const users = User.find();
});

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  const users = User.find();
});

module.exports = { getAllUsers, createUser, updateUser, deleteUser };
