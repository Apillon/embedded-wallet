const { create } = require('axios');
require('dotenv').config();

const apiKey = process.env.APILLON_API_KEY;
const apiSecret = process.env.APILLON_API_SECRET;
const baseURL = process.env.APILLON_API_BASE_URI || 'https://api.apillon.io';

const apillonAuthAPI = create({
  baseURL: `${baseURL}/embedded-wallet`,
  timeout: 10_000,
  headers: {
    Authorization: `Basic ${btoa(`${apiKey}:${apiSecret}`)}`,
  },
});

module.exports = { apillonAuthAPI };
