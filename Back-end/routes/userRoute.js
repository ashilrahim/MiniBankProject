import express from "express";
import { registerUser, loginUser, getUserProfile, editUserProfile } from "../controllers/usercontroller.js";
import authMiddleware from "../middleware/authMiddleware.js"; // Middleware to protect routes
import upload from "../middleware/uploadMiddleware.js"; // Middleware to handle image uploads

const router = express.Router();

// Route for registering a new user
router.post("/register", upload.single("image"), registerUser);

// Route for logging in a user
router.post("/login", loginUser);

// Route for getting the user profile (protected)
router.get("/profile", authMiddleware, getUserProfile);

// Route for updating the user profile (protected)
router.put("/update", authMiddleware, upload.single("image"), editUserProfile);

export default router;
