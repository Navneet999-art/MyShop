import express from "express";
const router = express.Router();
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import protect from "../middlewares/authMiddleware.js";

//@desc    register User
//@route   POST /api/users
//@access  Public
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
    const user = await User.create({
      name,
      email,
      password,
    });

    //if user created successfully
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("invalid User data");
    }
  })
);

//@desc    Authenticate user and get token
//@route   POST /api/users/login
//@access  Public
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);

      if (isValid) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        });
      } else {
        res.status(400).json({ error: "invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
  })
);
//@desc    get user profile
//@route   GET /api/users/profile
//@access  Private
router.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    //console.log(req);
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

//@desc    update user profile
//@route   PUT /api/users/profile
//@access  Private
router.put(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    //console.log(req);
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);
export default router;
