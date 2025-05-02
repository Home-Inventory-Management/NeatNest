// Helper functions for expense SQL operations

export async function getAllExpenses(pool) {
  const result = await pool.query('SELECT * FROM expenses ORDER BY created_at DESC');
  return result.rows;
}

export async function getExpenseById(pool, id) {
  const result = await pool.query('SELECT * FROM expenses WHERE id = $1', [id]);
  return result.rows[0];
}

export async function addExpense(pool, { name, quantity, category, date, price }) {
  const result = await pool.query(
    `INSERT INTO expenses 
     (name, quantity, category, date, price) 
     VALUES ($1, $2, $3, $4, $5) 
     RETURNING *`,
    [name, quantity, category || 'Uncategorized', date, price]
  );
  return result.rows[0];
}

export async function updateExpense(pool, id, { name, quantity, category, date, price }) {
  const result = await pool.query(
    `UPDATE expenses 
     SET name = $1, 
         quantity = $2, 
         category = $3, 
         date = $4, 
         price = $5 
     WHERE id = $6 
     RETURNING *`,
    [name, quantity, category, date, price, id]
  );
  return result.rows[0];
}

export async function deleteExpense(pool, id) {
  await pool.query('DELETE FROM expenses WHERE id = $1', [id]);
}
