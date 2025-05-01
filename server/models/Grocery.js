// Helper functions for grocery SQL operations

export async function getAllGroceries(pool) {
  const result = await pool.query('SELECT * FROM groceries ORDER BY created_at DESC');
  return result.rows;
}

export async function getGroceryById(pool, id) {
  const result = await pool.query('SELECT * FROM groceries WHERE id = $1', [id]);
  return result.rows[0];
}

export async function addGrocery(pool, { name, quantity, category, image_url }) {
  const result = await pool.query(
    'INSERT INTO groceries (name, quantity, category, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, quantity, category || 'Uncategorized', image_url || null]
  );
  return result.rows[0];
}

export async function updateGrocery(pool, id, { name, quantity, category, image_url }) {
  const result = await pool.query(
    'UPDATE groceries SET name = $1, quantity = $2, category = $3, image_url = $4 WHERE id = $5 RETURNING *',
    [name, quantity, category, image_url || null, id]
  );
  return result.rows[0];
}

export async function deleteGrocery(pool, id) {
  await pool.query('DELETE FROM groceries WHERE id = $1', [id]);
}