import express from 'express';
import {
  getAllGroceries,
  getGroceryById,
  addGrocery,
  updateGrocery,
  deleteGrocery
} from '../models/Grocery.js';

const router = express.Router();

// Allowed categories for validation
const ALLOWED_CATEGORIES = [
  'Fruits', 'Vegetables', 'Meat', 'Dairy', 'Bakery', 'Beverages', 'Snacks', 'Canned Goods'
];

function validateGroceryInput({ name, category, quantity, image_url }) {
  const errors = {};
  // Name validation
  if (!name || typeof name !== 'string' || name.trim().length < 3) {
    errors.name = 'Name is required and must be at least 3 characters.';
  } else if (/\d/.test(name)) {
    errors.name = 'Name cannot contain numbers.';
  }
  // Category validation
  if (!category || typeof category !== 'string') {
    errors.category = 'Category is required.';
  } else if (!ALLOWED_CATEGORIES.includes(category)) {
    errors.category = 'Invalid category.';
  }
  // Quantity validation
  if (quantity === undefined || quantity === null || isNaN(quantity)) {
    errors.quantity = 'Quantity is required and must be a number.';
  } else if (parseInt(quantity) < 1 || parseInt(quantity) > 100) {
    errors.quantity = 'Quantity must be between 1 and 100.';
  }
  // Image URL validation (optional, but must be a string if present)
  if (image_url && typeof image_url !== 'string') {
    errors.image_url = 'Image URL must be a string.';
  }
  return errors;
}

// Get all groceries
router.get('/', async (req, res) => {
  try {
    const groceries = await getAllGroceries(req.pool);
    res.json(groceries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single grocery by ID
router.get('/:id', async (req, res) => {
  try {
    const grocery = await getGroceryById(req.pool, req.params.id);
    if (grocery) {
      res.json(grocery);
    } else {
      res.status(404).json({ message: 'Grocery not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new grocery
router.post('/', async (req, res) => {
  const errors = validateGroceryInput(req.body);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }
  try {
    // Check for duplicate name (case-insensitive)
    const allGroceries = await getAllGroceries(req.pool);
    const duplicate = allGroceries.find(g => g.name.trim().toLowerCase() === req.body.name.trim().toLowerCase());
    if (duplicate) {
      return res.status(409).json({ message: 'A grocery with this name already exists.' });
    }
    const newGrocery = await addGrocery(req.pool, req.body);
    res.status(201).json(newGrocery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a grocery by ID
router.put('/:id', async (req, res) => {
  const errors = validateGroceryInput(req.body);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }
  try {
    // Check for duplicate name (case-insensitive, excluding current item)
    const allGroceries = await getAllGroceries(req.pool);
    const duplicate = allGroceries.find(g => g.name.trim().toLowerCase() === req.body.name.trim().toLowerCase() && g.id != req.params.id);
    if (duplicate) {
      return res.status(409).json({ message: 'A grocery with this name already exists.' });
    }
    const updatedGrocery = await updateGrocery(req.pool, req.params.id, req.body);
    if (updatedGrocery) {
      res.json(updatedGrocery);
    } else {
      res.status(404).json({ message: 'Grocery not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a grocery by ID
router.delete('/:id', async (req, res) => {
  try {
    await deleteGrocery(req.pool, req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;