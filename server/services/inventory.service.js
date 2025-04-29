import { Inventory, Category } from '../models/index.js';

export const createInventory = (data) => Inventory.create(data);
export const createInventoryCategory = (name) => Category.create({ name });
export const deleteInventoryCategory = (id) => Category.destroy({ where: { id } });
export const getAllInventories = () => Inventory.findAll({ include: Category });
export const getInventoryById = (id) => Inventory.findByPk(id);
export const updateInventory = (id, data) => Inventory.update(data, { where: { id } });
export const deleteInventory = (id) => Inventory.destroy({ where: { id } });