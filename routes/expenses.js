const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const mongoose = require('mongoose');


router.get('/', async (req, res) => {
  try {
   
    const { category, startDate, endDate } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }
    const expenses = await Expense.find(filter).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/summary', async (req, res) => {
  try {
    
    const totalAgg = await Expense.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } }
    ]);

    const byCategory = await Expense.aggregate([
      { $group: { _id: "$category", total: { $sum: "$amount" }, count: { $sum: 1 } } },
      { $project: { category: "$_id", total: 1, count: 1, _id: 0 } },
      { $sort: { total: -1 } }
    ]);

    const total = totalAgg[0]?.total || 0;
    const count = totalAgg[0]?.count || 0;

    res.json({ total, count, byCategory });
  } catch (err) {
    console.error('Summary error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});



router.post('/', async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;
    // basic validation
    if (!title || amount === undefined || !category || !date) {
      return res.status(400).json({ message: 'title, amount, category, date are required' });
    }
    const expense = new Expense({ title, amount, category, date });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    console.error(err);
    // if mongoose validation error:
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid ID' });

    const updated = await Expense.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Expense not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid ID' });

    const removed = await Expense.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ message: 'Expense not found' });
    res.json({ message: 'Expense removed', id: removed._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
