import { Router } from 'express';
import { create, list, get, update, remove, createCategory, removeCategory } from '../controllers/inventory.controller.js';
import { validateInventory } from '../middlewares/inventory.validation.js';

const router = Router();

router.post('/', validateInventory, create);
router.get('/', list);
router.get('/:id', get);
router.put('/:id', update);
router.delete('/:id', remove);
router.post('/category', createCategory);
router.delete('/category/:id', removeCategory);

export default router;
