import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    time: {
        type: String,
    },
    details: {
        type:  String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
})

const transaction = mongoose.model('Transaction',TransactionSchema);

export default  transaction;