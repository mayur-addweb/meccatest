
const express = require('express');
const axios = require('axios').default;
const app = express();
app.use(express.json());
const client = axios.create({
  baseURL: 'https://meccamagento.addwebprojects.com',
  timeout: 5000,
  headers: {'Content-Type': 'application/json'}
});


app.get('/getPaymentIntent', async (req, res) => {
    const orderId = { order_id : `${req.query.orderId}` };
    try {
      const data = await client.post('/rest/V1/payment/paymentIntent', orderId)

      res.status(200).json(data.data);
    } catch (err) {
      res.status(500).json({ message: err });
    }
});


app.get('/updateStatus', async (req, res) => {
  const paymentIntent = { payment_intent_id : `${req.query.intentID}` };
  try {

    const data = await client.post('/rest/V1/meccabook/orders', paymentIntent)

    res.status(200).json(data.data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

app.get('/addNotification', async (req, res) => {
  const usrEmail = { email : `${req.query.email}`};
  try {
    const data = await client.post('/rest/V1/productalertstock/add/'+req.query.product, usrEmail)

    res.status(200).json(data.data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});


app.get('/addDonation', async (req, res) => {

  let customer = req.query.token;

  client.defaults.headers.Authorization = 'Bearer '+customer

  const donationData = {mask_id : `${req.query.cart}`, donation: `${req.query.donation}`};
  try {
    const data = await client.post('/rest/V1/donation/add', donationData)

    res.status(200).json(data.data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

app.get('/addEasyShip', async (req, res) => {

  let customer = req.query.token;

  client.defaults.headers.Authorization = 'Bearer '+customer

  const easyShipData = {postcode : `${req.query.postcode}`};
  
  try {
    const data = await client.post('/rest/V1/easyship/estimate-shipping-methods/mine', easyShipData)

    res.status(200).json(data.data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

app.get('/productReviews', async (req, res) => {
  let productSku = req.query.productSku;
  try {
    const data = await client.get(`/rest/V1/yotpo/reviews?sku=${productSku}`)
    res.status(200).json(data.data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
app.get('/alchemiyaVideo', async (req, res) => {
  let productSku = req.query.productSku;
  console.log(productSku,"fhusdgfusgfusdgf");
  try {
    const data = await client.get(`/rest/V1/productattribute?sku=${productSku}`)
    res.status(200).json(data.data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

app.get('/adultPopular', async (req, res) => {
  try {
    const data = await client.get(`/rest/V1/popularproduct`)
    res.status(200).json(data.data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

app.get('/kidsPopular', async (req, res) => {
  try {
    const data = await client.get(`/rest/V1/popularproduct?category_id=88`)
    res.status(200).json(data.data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
module.exports = app
