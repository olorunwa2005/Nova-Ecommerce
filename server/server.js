const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/ai', aiRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.json({ message: 'Nova E-Commerce API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something broke!' });
});

// Test DB Connection and Start Server
const startServer = async () => {
    try {
        await db.query('SELECT 1');
        console.log('Database connection verified');
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to database:', error.message);
        console.log('Server starting anyway, but DB-dependent features will fail.');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT} (Disconnected from DB)`);
        });
    }
};

startServer();
