const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const incomeSchema = new Schema({
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

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;
