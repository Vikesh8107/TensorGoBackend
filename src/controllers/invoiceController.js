const admin = require('firebase-admin');
const serviceAccount = require('../firebaseServiceAccountKey.json');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

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
    return res.status(200).json(invoices);
  } catch (error) {
    console.error('Error getting invoices:', error);
    return res.status(500).json({ error: 'Failed to get invoices' });
  }
};

module.exports = {
  getInvoices,
};
