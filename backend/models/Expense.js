const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    expenseName: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    description: {
        type: String
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Expense", expenseSchema);