const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const expenseSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    other: {
        type: String,
        required: true,
    }
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
