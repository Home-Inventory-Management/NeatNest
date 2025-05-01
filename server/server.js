import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import groceryRoutes from './routes/groceryRoutes.js';
import axios from 'axios';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
// Use PORT from .env file with fallback to 5000
const PORT = process.env.PORT || 5000;

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
app.use('/api/groceries', (req, res, next) => {
  req.pool = pool;
  next();
}, groceryRoutes);

// Root route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Grocery List API' });
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
        console.log('Generating dummy grocery data...');
        try {
          const response = await axios.post(`http://localhost:${PORT}/api/groceries/generate-dummy-data`, {}, {
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
        console.log(`Port ${PORT} is already in use, trying port ${PORT + 1}...`);
        PORT += 1;
        server.close();
        startServer();
      } else {
        console.error('Server error:', err);
      }
    });
};

startServer();