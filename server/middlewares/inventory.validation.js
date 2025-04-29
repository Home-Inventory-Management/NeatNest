export const validateInventory = (req, res, next) => {
    const { name, quantity, categoryId, expireDate } = req.body;
    if (!name || !quantity || !categoryId || !expireDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    next();
  };