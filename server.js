/*This is a server implemented in Express for simplicity*/

require('dotenv').config(); // read .env files for configurations
const express = require('express'); // loading express
const bodyParser = require('body-parser'); // loading body parser
const { getRates, getSymbols, getHistoricalRate} = require('./lib/fixer-service'); //Requiring the service
const { convertCurrency } = require('./lib/free-currency-service'); //Requiring service

const app = express(); // create express server
const port = process.env.PORT || 3000; // on which port the server goes

// Set public folder as root
app.use(express.static('public'));

// Allow front-end access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// Parse POST data as URL encoded data
app.use(bodyParser.urlencoded({
  extended: true,
}));

// Parse POST data as JSON
app.use(bodyParser.json());

// Express Error handler
const errorHandler = (err, req, res) => {
  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    res.status(403).send({ title: 'Server responded with an error', message: err.message });
  } else if (err.request) {
    // The request was made but no response was received
    res.status(503).send({ title: 'Unable to communicate with server', message: err.message });
  } else {
    // Something happened in setting up the request that triggered an Error
    res.status(500).send({ title: 'An unexpected error occurred', message: err.message });
  }
};

// Fetch Latest Currency Rates
app.get('/api/rates', async (req, res) => {
  try {
    const data = await getRates();
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  } catch (error) {
    errorHandler(error, req, res);
  }
});


// Fetch Currency Rates by date
app.post('/api/historical', async (req, res) => {
  try {
    const { date } = req.body;
    const data = await getHistoricalRate(date);
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  } catch (error) {
    errorHandler(error, req, res);
  }
});


// Fetch Symbols
app.get('/api/symbols', async (req, res) => {
  try {
    const data = await getSymbols();
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  } catch (error) {
    errorHandler(error, req, res);
  }
});



// Convert Currency
app.post('/api/convert', async (req, res) => {
  try {
    const { from, to } = req.body;
    const data = await convertCurrency(from, to);
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  } catch (error) {
    errorHandler(error, req, res);
  }
});


// Redirect all traffic to index.html
app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));

// Listen for HTTP requests on port 3000
app.listen(port, () => {
  console.log('listening on %d', port);
});


//Tests
// Test Symbols Endpoint
// const test = async() => {
//   const data = await getSymbols();
//   console.log(data);
// }

// Test Currency Conversion Endpoint
// const test = async() => {
//   const data = await convertCurrency("EUR", "USD");
//   console.log(data);
// }

//Test get rates
// const test = async() => {
//   const data = await getRates();
//   console.log(data)
// }

//Test date shit:
// const test = async() => {
//   const data = await getHistoricalRate('2012-07-14');
//   console.log(data);
// }

// test();