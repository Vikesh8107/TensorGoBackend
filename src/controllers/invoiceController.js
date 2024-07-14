const admin = require('firebase-admin');
const axios = require('axios');
const serviceAccount = require('../firebaseServiceAccountKey.json');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

// Webhook URL for Zapier
const webhookUrl = 'https://hooks.zapier.com/hooks/catch/19457991/223qe60/';

// Function to send data to Zapier webhook
const sendWebhook = async (invoice) => {
  try {
    await axios.post(webhookUrl, invoice);
  } catch (error) {
    console.error('Error sending webhook:', error);
  }
};

// Get all invoices for a user
const getInvoices = async (req, res) => {
  const userId = req.query.userId; // Retrieve userId from query params

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    // Fetch invoices where userId matches the provided ID
    const snapshot = await db.collection('1234').where('userId', '==', userId).get();

    if (snapshot.empty) {
      return res.status(404).json({ message: 'No invoices found' });
    }

    const invoices = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Send each invoice to Zapier webhook
    for (const invoice of invoices) {
      await sendWebhook(invoice);
    }

    return res.status(200).json(invoices);
  } catch (error) {
    console.error('Error getting invoices:', error);
    return res.status(500).json({ error: 'Failed to get invoices' });
  }
};

module.exports = {
  getInvoices,
};
