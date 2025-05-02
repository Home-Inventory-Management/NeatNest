import express from 'express';
import {
  getAllExpenses,
  getExpenseById,
  addExpense,
  updateExpense,
  deleteExpense
} from '../models/Expense.js';

const router = express.Router();

const ALLOWED_CATEGORIES = [
  'Fruits', 'Vegetables', 'Meat', 'Dairy', 'Bakery', 'Beverages', 'Snacks', 'Canned Goods'
];

function validateExpenseInput({ name, category, quantity, date }) {
  const errors = {};
  if (!name || typeof name !== 'string' || name.trim().length < 3) {
    errors.name = 'Name is required and must be at least 3 characters.';
  } else if (/\d/.test(name)) {
    errors.name = 'Name cannot contain numbers.';
  }
  if (!category || typeof category !== 'string') {
    errors.category = 'Category is required.';
  } else if (!ALLOWED_CATEGORIES.includes(category)) {
    errors.category = 'Invalid category.';
  }
  if (quantity === undefined || quantity === null || isNaN(quantity)) {
    errors.quantity = 'Quantity is required and must be a number.';
  } else if (parseInt(quantity) < 1 || parseInt(quantity) > 100) {
    errors.quantity = 'Quantity must be between 1 and 100.';
  }
  if (!date || isNaN(Date.parse(date))) {
    errors.date = 'Valid date is required.';
  }
  return errors;
}

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await getAllExpenses(req.pool);
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single expense by ID
router.get('/:id', async (req, res) => {
  try {
    const expense = await getExpenseById(req.pool, req.params.id);
    if (expense) {
      res.json(expense);
    } else {
      res.status(404).json({ message: 'Expense not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new expense (NO duplicate name check)
router.post('/', async (req, res) => {
  const errors = validateExpenseInput(req.body);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }
  try {
    const newExpense = await addExpense(req.pool, req.body);
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an expense by ID (NO duplicate name check)
router.put('/:id', async (req, res) => {
  const errors = validateExpenseInput(req.body);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }
  try {
    const updatedExpense = await updateExpense(req.pool, req.params.id, req.body);
    if (updatedExpense) {
      res.json(updatedExpense);
    } else {
      res.status(404).json({ message: 'Expense not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an expense by ID
router.delete('/:id', async (req, res) => {
  try {
    await deleteExpense(req.pool, req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
