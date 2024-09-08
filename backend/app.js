const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
require('./db/mongodb'); // Ensure this connects to MongoDB correctly
const postRoute = require('./routes/postRoute');
const cors = require('cors');
const ticketRoutes = require('./routes/tickets');

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(cors()); // Apply CORS middleware before routes
app.use(express.json()); // Global JSON parsing middleware
app.use(morgan('dev'));

// Routes
app.use('/api', ticketRoutes);
app.use('/api', postRoute);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`${PORT} is up and running`);
});
