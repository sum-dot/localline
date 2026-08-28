import { hashPassword } from "../utils/helpers.js";
import User from "../models/User.js";

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await hashPassword(password);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    const otherUser = await User.findOne({ email }).select(["email"]);

    if (otherUser) {
      return res.status(400).json({
        error: "Email already in use",
      });
    }

    const savedUser = await newUser.save();

    return res.status(201).json({
      message: "New user added successfully",
    });

  } catch (err) {
    return res.status(400).json(err);
  }
};