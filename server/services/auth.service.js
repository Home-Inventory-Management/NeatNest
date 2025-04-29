import { User } from '../models/index.js';

export const registerUser = (data) => User.create(data);