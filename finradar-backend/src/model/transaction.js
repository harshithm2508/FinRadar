import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, 
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
        enum: ["food", "fashion", "income", "rent", "misc"]
    }},
    {
        timestamps: true
    }
);

const transaction = mongoose.model("Transaction", transactionSchema);

export default transaction;