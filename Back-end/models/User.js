import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  initialAmount: { type: Number, required: true },
  balance: { type: Number, required: true },
  accountNumber: { type: String, unique: true, required: true },
  adhar: { type: String, required: true },
  pancard: { type: String, required: true },
  age: { type: Number, required: true },
  dob: { type: Date, required: true },
  phone: { type: String, required: true },
  image: { type: String }, 
  role: { type: String, enum: ["user", "admin"], default: "user" } // Optional field for image path
}, { timestamps: true });

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
