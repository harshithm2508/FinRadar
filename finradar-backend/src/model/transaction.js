import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, 
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    amount: {
        type: Number, 
        required: true,
    },
    type: {
        type: String,
        enum: ["income", "expense"],
        required: true
    },
    category: {
        type: String,
        enum: ["food", "fashion", "income", "rent", "misc", "entertainment", "investment"]
    },
    paymentMethod: {
        type: String,
        enum: ["cash", "upi", "debit_card", "amex_card"],
        required: true
        
    },

    transactionDate: {
        type: Date,
        default: Date.now
    }},
    {
        timestamps: true
    }
);

const transaction = mongoose.model("Transaction", transactionSchema);

export default transaction;