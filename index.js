require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// connect database
connectDB(process.env.MONGO_URI);

// middlewares
app.use(cors());
app.use(express.json()); // body parser

// routes
app.use('/api/expenses', require('./routes/expenses'));

// health
app.get('/', (req, res) => res.send('Expense Tracker API is running'));

// error handler (simple)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
