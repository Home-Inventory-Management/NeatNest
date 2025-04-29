import { User } from '../models/index.js';

export const validateLogin = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username, password } });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  req.user = user;
  next();
};