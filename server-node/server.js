const express = require('express');
const cors = require('cors');
const { Client } = require('@elastic/elasticsearch');

const client = new Client({ node: 'https://localhost:9200', tls: { rejectUnauthorized: false } });

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

app.post('/api/orders', async (req, res) => {
  try {
    const { fullName, address, email, cart } = req.body;
    if (!fullName || !address || !email || !cart || !Array.isArray(cart)) {
      return res.status(400).send({ error: 'Missing or invalid fields' });
    }
    const response = await client.index({
      index: 'orders',
      document: {
        fullName,
        address,
        email,
        cart,
        createdAt: new Date()
      }
    });
    res.status(201).send({ message: 'Order saved', id: response._id });
  } catch (err) {
    console.error('Elasticsearch error:', err);
    res.status(500).send({ error: 'Failed to save order', details: err.message });
  }
});

app.listen(4000, () => console.log('Order server running on port 4000'));