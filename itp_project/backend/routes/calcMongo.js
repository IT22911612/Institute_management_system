const express = require('express');
const Expense = require('../models/Expense'); // Assuming you have a model for expenses

const router = express.Router();

// Route to fetch all expenses
router.get('http://localhost:8070/expense/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Route to calculate total number of expenses
router.get('http://localhost:8070/expense/total', async (req, res) => {
  try {
    const totalExpenses = await Expense.countDocuments();
    res.json({ totalExpenses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
