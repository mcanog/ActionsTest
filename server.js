/*This is a server implemented in Express for simplicity*/

require('dotenv').config(); // read .env files for configurations
const express = require('express'); // loading express

const app = express(); // create express server
const port = process.env.PORT || 3000; // on which port the server goes

// Set public folder as root
app.use(express.static('public'));

// Allow front-end access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// Redirect all traffic to index.html
app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));

// Listen for HTTP requests on port 3000
app.listen(port, () => {
  console.log('listening on %d', port);
});
