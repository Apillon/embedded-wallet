const { create } = require('axios');
require('dotenv').config();

const apiKey = process.env.APILLON_API_KEY;
const apiSecret = process.env.APILLON_API_SECRET;

const apillonAuthAPI = create({
  baseURL: 'https://api.apillon.io/embedded-wallet',
  timeout: 10_000,
  headers: {
    Authorization: `Basic ${btoa(`${apiKey}:${apiSecret}`)}`,
  },
});

module.exports = { apillonAuthAPI };
