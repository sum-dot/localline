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
    const { from, to } = req.body;

    if (!from || !to) {
      return res.status(400).json({ error: "from and to are required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Drop any malformed entries left over from before favorites
    // stored routes instead of bus references, so they never block
    // future saves.
    user.favorites = user.favorites.filter((r) => r.from && r.to);

    const index = user.favorites.findIndex(
      (r) =>
        r.from.toLowerCase() === from.toLowerCase() &&
        r.to.toLowerCase() === to.toLowerCase(),
    );

    if (index === -1) {
      user.favorites.push({ from, to });
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
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Same defensive filter for display, so old broken entries
    // never render as blank rows either.
    const validFavorites = user.favorites.filter((r) => r.from && r.to);
    res.status(200).json(validFavorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
