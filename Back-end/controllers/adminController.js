import UserModel from "../models/User.js";


// Get User Count
export const getUserCount = async (req, res) => {
  try {
    const count = await UserModel.countDocuments({ role: "user" });
    res.status(200).json({ count });
  } catch (err) {
    console.error("Error fetching user count: ", err);
    res.status(500).json({ error: "Error fetching user count" });
  }
};

// Get users with role 'user'
export const getUserByRole = async (req, res) => {
  try {
    const users = await UserModel.find({ role: "user" });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user by username
export const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await UserModel.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};