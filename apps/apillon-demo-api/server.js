const express = require('express');
const app = express();
const { apillonAuthAPI } = require('./apillon-api');

app.use((req, res, next) => {
  // Replace the * value below with your own origin
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(express.json());

app.get('/session-token', async (req, res) => {
  try {
    const response = await apillonAuthAPI.get('/session-token');
    res.json(response.data);
  } catch (err) {
    console.error(err)
    res.status(500).json(`Error: ${err}`);
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
