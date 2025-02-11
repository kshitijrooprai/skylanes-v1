require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const routes = require('./routes');

const app = express();

// mongodb database connection function
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the 'public' folder // all frontend code
app.use(express.static(path.join(__dirname, 'public')));

// Routes to handle /api
app.use('/api', routes);

// frontend and backend on same server
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    // console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// server running message
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    // console.log(`Server running on port ${PORT}`);
});
