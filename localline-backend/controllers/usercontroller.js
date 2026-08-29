import User from "../models/User.js";
import { hashPassword } from "../models/utils/helpers.js";

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await hashPassword(password);
  const newUser = new User({ name, email, password: hashedPassword });

  try {
    const otherUser = await User.findOne({ email }).select(["email"]);
    if (otherUser)
      return res.status(400).json({ error: "Email already in use" });

    await newUser.save();
    return res.status(201).json({ message: "New user added successfully" });
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { name: req.body.name, email: req.body.email },
      { new: true, runValidators: true },
    ).select("-password");
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
