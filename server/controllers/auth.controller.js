import { registerUser } from '../services/auth.service.js';

export const register = async (req, res) => {
  const { username, email, mobile, password } = req.body;
  const user = await registerUser({ username, email, mobile, password });
  res.status(201).json(user);
};

export const login = (req, res) => {
  res.status(200).json({ message: 'Login successful', user: req.user });
};