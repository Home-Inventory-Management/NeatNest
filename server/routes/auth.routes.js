import { Router } from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { validateLogin } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', validateLogin, login);

export default router;