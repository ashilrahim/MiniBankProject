import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoute.js";
import transactionRoute from "./routes/transactionRoute.js"
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use("/uploads", express.static("uploads"));
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json()); // Parse JSON payloads

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/transaction", transactionRoute)
app.use("/api/admin", adminRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
