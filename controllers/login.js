import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please fill all fields",
      success: false,
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "Email not exists",
      success: false,
    });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({
      message: "Invalid password",
      success: false,
    });
  }

  const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  if (user && validPassword) {
    res.status(200).json({
      message: `Welcome ${user.name}`,
      data: user,
      token,
      success: true,
    });
  }
};
