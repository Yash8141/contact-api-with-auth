import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

export const createRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    
    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all the fields",
        success: false,
      });
    }
    
    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long",
        success: false,
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists",
        success: false,
      });
    }
    
    // decrypt password before user register
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user
    const register = new User({ name, email, password: hashPassword });
    await register.save();

    res.status(201).json({
      message: "User registered successfully",
      data: { name: register.name, email: register.email },
      success: true,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
        success: false,
      });
    }
    next(error);
  }
};
