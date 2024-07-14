const express = require('express');
const router = express.Router();
const { getInvoices } = require('../controllers/invoiceController');

// Route for fetching invoices
router.get('/invoices', getInvoices);

module.exports = router;
