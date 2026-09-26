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
    const existingUser = await User.findOne({
      email: req.body.email,
      _id: { $ne: req.user.id },
    });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists." });
    }
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

export const toggleFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { busId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const index = user.favorites.findIndex((id) => id.toString() === busId);

    if (index === -1) {
      user.favorites.push(busId);
    } else {
      user.favorites.splice(index, 1);
    }

    await user.save();
    res.status(200).json({ favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favorites");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user.favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
