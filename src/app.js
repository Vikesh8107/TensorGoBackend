const express = require('express');
const cors = require('cors');
const app = express();
const invoiceRoutes = require('./routes/invoiceRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', invoiceRoutes);

module.exports = app;
