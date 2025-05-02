import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import expenseRoutes from './routes/expenseRoutes.js';
import axios from 'axios';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
// Use PORT from .env file with fallback to 5000
let PORT = process.env.PORT || 5000;

// PostgreSQL Connection
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT || 5432,
});

pool.connect()
  .then(() => console.log('PostgreSQL connected successfully'))
  .catch((err) => {
    console.error('PostgreSQL connection failed:', err.message);
    process.exit(1);
  });

// Middleware
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'], allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(express.json());
app.use(morgan('dev'));

// Pass pool to routes
app.use('/api/expenses', (req, res, next) => {
  req.pool = pool;
  next();
}, expenseRoutes);

// Root route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Expense List API' });
});

/// Dummy data generation route
app.post('/api/expenses/generate-dummy-data', async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10); // e.g. "2024-06-01"
    const dummyData = [
      { name: "Apples", quantity: 5, category: "Fruits", date: today, price: 2.99 },
      { name: "Milk", quantity: 2, category: "Dairy", date: today, price: 3.49 },
    ];

    // Insert dummy data into the database
    await Promise.all(
      dummyData.map(item =>
        pool.query(
          "INSERT INTO expenses (name, quantity, category, date, price) VALUES ($1, $2, $3, $4, $5)",
          [item.name, item.quantity, item.category, item.date, item.price]
        )
      )
    );

    res.status(200).json({ message: "Dummy data generated!" });
  } catch (error) {
    console.error("Error generating dummy data:", error);
    res.status(500).json({ error: error.message });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server with port retry logic
const startServer = () => {
  const server = app.listen(PORT)
    .on('listening', () => {
      console.log(`Server is running on http://localhost:${PORT}`);

      // Generate dummy data when server starts
      const generateDummyData = async () => {
        console.log('Generating dummy expense data...');
        try {
          const response = await axios.post(`http://localhost:${PORT}/api/expenses/generate-dummy-data`, {}, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log('Dummy data generated:', response.data.message);
        } catch (error) {
          console.error('Failed to generate dummy data:', error);
        }
      };

      // Call the function to generate dummy data
      generateDummyData();
    })
    .on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is already in use, trying port ${Number(PORT) + 1}...`);
        PORT = Number(PORT) + 1;
        server.close();
        startServer();
      } else {
        console.error('Server error:', err);
      }
    });
};

startServer();
