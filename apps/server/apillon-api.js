const axios = require('axios');
require('dotenv').config()

const baseUrl = process.env.APILLON_API_BASE_URI || 'https://api.apillon.io/oasis'
const apiKey = process.env.APILLON_API_KEY;
const apiSecret = process.env.APILLON_API_SECRET;

const apillonAuthAPI = axios.create({
  baseURL: baseUrl,
  timeout: 3000,
  headers: {
    'Authorization': `Basic ${btoa(`${apiKey}:${apiSecret}`)}`
  }
});

module.exports = { apillonAuthAPI };