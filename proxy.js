const express = require('express');
const request = require('request');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/tecajn/v1', (req, res) => {
  request({ url: 'http://api.hnb.hr/tecajn/v1' }, (error, response, body) => {
    if (response.statusCode === 200) {
      res.json(JSON.parse(body));
    } else {
      return res.status(500).json({ type: 'error', message: error.message });
    }
  });
});

app.listen(5000, () => console.log('Proxy server is up...'));
