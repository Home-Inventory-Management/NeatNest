import sequelize from '../config/db.config.js';
import User from './user.model.js';
import Inventory from './inventory.model.js';
import Category from './category.model.js';

User.initModel(sequelize);
Category.initModel(sequelize);
Inventory.initModel(sequelize);

Inventory.belongsTo(Category);
Category.hasMany(Inventory);

await sequelize.sync();

export { User, Inventory, Category, sequelize };