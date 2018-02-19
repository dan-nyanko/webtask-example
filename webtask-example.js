require('dot-env');

const app = new (require('express'))();
const wt = require('webtask-tools');
const axios = require('axios');

app.get('/', function (req, res) {
  res.end('Hello');
});

app.get('/proxy', (req, res) => {
  axios.get('https://data.kingcounty.gov/resource/gkhn-e8mn.json', {
    params: {
      $limit: 100,
      $order: 'inspection_date DESC',
      $$app_token: process.env.XAppToken,
    }
  }).then((proxyRes) => {
    console.log('proxyRes: ', proxyRes);
    res.json(proxyRes.data);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
  });

});

module.exports = wt.fromExpress(app);
