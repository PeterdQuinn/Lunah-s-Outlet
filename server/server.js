const express = require('express');
const fetch = require('node-fetch');
const CryptoJS = require('crypto-js');
const cors = require('cors');

const app = express();
app.use(cors());

const ACCESS_KEY_ID = 'YOUR_ACCESS_KEY_ID';
const SECRET_ACCESS_KEY = 'YOUR_SECRET_ACCESS_KEY';
const PRODUCT_ENDPOINT = 'https://webservices.amazon.com/paapi5/searchitems';
const PRODUCT_PARAMS = {
  // Your product search parameters
};

app.get('/api/search', async (req, res) => {
  const timestamp = new Date().toISOString();
  const hash = CryptoJS.HmacSHA256(`${timestamp}\n${PRODUCT_ENDPOINT}\n${JSON.stringify(PRODUCT_PARAMS)}`, SECRET_ACCESS_KEY);
  const hashHex = hash.toString(CryptoJS.enc.Hex);

  try {
    const response = await fetch(`${PRODUCT_ENDPOINT}?${new URLSearchParams(PRODUCT_PARAMS)}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Amz-Target': 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems',
        'X-Amz-Date': timestamp,
        'Authorization': `AWS4-HMAC-SHA256 Credential=${ACCESS_KEY_ID}/${timestamp.substring(0, 8)}/us-east-1/ProductAdvertisingAPI/aws4_request, SignedHeaders=content-type;host;x-amz-date;x-amz-target, Signature=${hashHex}`
      }
    });

    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
