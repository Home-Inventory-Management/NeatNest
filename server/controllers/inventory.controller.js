import { createInventory, deleteInventoryCategory, createInventoryCategory, getAllInventories, getInventoryById, updateInventory, deleteInventory } from '../services/inventory.service.js';

export const create = async (req, res) => {
  const item = await createInventory(req.body);
  res.status(201).json(item);
};

export const createCategory = async (req, res) => {
  const category = await createInventoryCategory(req.body.name);
  res.status(201).json(category);
};

export const removeCategory = async (req, res) => {
  await deleteInventoryCategory(req.params.id);
  res.status(204).send();
};

export const list = async (_req, res) => {
  const items = await getAllInventories();
  res.status(200).json(items);
};

export const get = async (req, res) => {
  const item = await getInventoryById(req.params.id);
  res.status(200).json(item);
};

export const update = async (req, res) => {
  const item = await updateInventory(req.params.id, req.body);
  res.status(200).json(item);
};

export const remove = async (req, res) => {
  await deleteInventory(req.params.id);
  res.status(204).send();
};
