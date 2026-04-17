const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();

app.use(express.static('.'));

app.get('/api/markets', async (req, res) => {
  try {
    const response = await fetch(
      'https://gamma-api.polymarket.com/markets?active=true&closed=false&limit=50&order=volume&ascending=false',
      { headers: { 'Accept': 'application/json' } }
    );
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Running at port ' + PORT));
