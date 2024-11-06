import Transaction from "../models/Transaction.js";
import UserModel from "../models/User.js";

// Deposit Money
export const deposit = async (req, res) => {
  const { amount, details } = req.body;
  const userId = req.user.id;

  try {
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newBalance = user.balance + amount;

    const transaction = new Transaction({
      user: userId,
      amount,
      details,
      balance: newBalance,
    });

    await transaction.save();
    user.balance = newBalance;
    await user.save();

    res.status(201).json({ message: "Deposit successful", transaction });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

// Withdraw money
export const withdraw = async (req, res) => {
  const { amount, details } = req.body;
  const userId = req.user.id;

  try {
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.balance < amount) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    const newBalance = user.balance - amount;

    const transaction = new Transaction({
      user: userId,
      amount,
      details,
      balance: newBalance,
    });
    await transaction.save();
    user.balance = newBalance;
    await user.save();

    res.status(201).json({ message: "Withdrawal successful", transaction });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};


export const getTransactionHistory = async (req, res) => {
    const userId = req.user.id;

    try {
        const transactions = await Transaction.find({ user: userId }).sort({ date: -1 });
        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const getUserTransactionHistoryByUsername = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await UserModel.findOne({ username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const transactions = await Transaction.find({ user: user._id }).sort({ date: -1 });
        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};