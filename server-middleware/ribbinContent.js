
const express = require('express');
const axios = require('axios').default;
const app = express();
app.use(express.json());
const client = axios.create({
  baseURL: 'https://meccamagento.addwebprojects.com',
  timeout: 5000,
  headers: {'Content-Type': 'application/json'}
});


app.get('/ribbin', async (req, res) => {
    try {
      const data = await client.get('/rest/V1/banner')
      res.status(200).json(data.data);
    } catch (err) {
      res.status(500).json({ message: err });
    }
});

module.exports = app
