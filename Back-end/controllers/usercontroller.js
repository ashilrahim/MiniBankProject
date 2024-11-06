import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateAccountNumber } from "../utils/generateAccountNumber.js";
import UserModel from '../models/User.js'
export const registerUser = async (req, res) => {
  const {
    name,
    address,
    username,
    email,
    password,
    initialAmount,
    adhar,
    pancard,
    age,
    dob,
    phone,
  } = req.body;

  try {
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate unique account number
    const accountNumber = await generateAccountNumber();

    // Get the image path if an image is uploaded
    const imagePath = req.file ? req.file.path : "";

    // Create a new user
    const newUser = new UserModel({
      name,
      address,
      username,
      email,
      password: hashedPassword,
      initialAmount,
      balance: initialAmount,
      accountNumber,
      adhar,
      pancard,
      age,
      dob,
      phone,
      image: imagePath,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: "Internal server error" });
  }
};


// Login Controller
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await UserModel.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Create and sign a JWT token
    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return the token to the client
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        accountNumber: user.accountNumber,
        balance: user.balance,
        role: user.role
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// getUser profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password"); // Exclude the password
    if (!user) return res.status(404).json({ message: "User not found" });

    // Return the user profile data
    res.status(200).json({
      name: user.name,
      photo: user.image,      // Updated for image path
      email: user.email,
      address: user.address,
      age: user.age,
      aadhar: user.adhar,     // Make sure to match field names with the frontend
      username: user.username,
      dob: user.dob,
      phone: user.phone,
      pan: user.pancard,      // Match this field as well
      accountNumber: user.accountNumber,
      balance: user.balance,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// update user profile
export const editUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming req.user contains authenticated user's data

    // Extract data from the request body
    const {
      name,
      username,
      email,
      dob,
      adhar,
      address,
      phone,
      age,
      pancard,
    } = req.body;

    const updateData = { name, username, email, dob, adhar, address, phone, age, pancard };

    // If there's an image file, add it to updateData
    if (req.file) {
      updateData.image = req.file.path; // Assuming file middleware sets path on req.file
    }

    // Update user data in the database
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};