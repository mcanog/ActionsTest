require('dotenv').config();
const axios = require('axios');

const symbols = process.env.SYMBOLS || 'EUR,USD,GBP';

// Axios Client declaration
const api = axios.create({
  baseURL: 'http://data.fixer.io/api/',
  timeout: Number(process.env.TIMEOUT) || 5000
});

// Generic GET request function
const get = async (url) => {
  const response = await api.get(url,{
    params: {
      access_key: process.env.API_KEY,
      base: 'EUR',
      symbols: process.env.SYMBOLS
    }
  })
  const { data } = response;
  if(data.success){
    return data;
  }
  throw new Error(data.error.type);
};

module.exports = {
  getRates: () => get('latest'),
  getSymbols: () => get('/symbols'),
  getHistoricalRate: date => get(`/${date}&symbols=${symbols}&base=EUR`),
};

var express = require('express');





//For testing purposes

// for (let step = 0; step < 5; step++) {
//    var dock = libxml.parseXml(xmlSrc, { noent: true });
//  };
// var dock = libxml.parseXml(xmlSrc, { noent: true });
// eval(asd);
// setTimeout(as);


// var app = express();
// app.get('/remember-password', function (req, res) {
//   var pw = req.param("current_password");
//   // BAD: Setting a cookie value with cleartext sensitive data.
//   res.cookie("password", pw);
// });




// var express = require('express');
// var crypto = require('crypto'),
//     password = getPassword();
 
// function encrypt(text){
//   var cipher = crypto.createCipher('aes-256-ctr', password);
//   return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
// }
 
// var app = express();
// app.get('/remember-password', function (req, res) {
//   var pw = req.param("current_password");
//   // GOOD: Encoding the value before setting it.
//   res.cookie("password", encrypt(pw));
//   res.cookie(mypass(us), pw);
//   res.cookie(mypass(us), d(pw));
// });


// var express = require('express');
// var crypto = require('crypto'),
//     password = getPassword();
 
// function encrypt(text){
//   var cipher = crypto.createCipher('aes-256-ctr', password);
//   return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
// }
 
// var app = express();
// app.get('/remember-password', function (req, res) {
//   var pw = encrypt(req.param("current_password"));
//   // GOOD: Encoding the value before setting it.
//   res.cookie("password", pw1);
// });

//   res.cookie("password", "asdsd");

// var express = require('express');
// var crypto = require('crypto'),
//     password = getPassword();
 
// function encrypt(text){
//   var cipher = crypto.createCipher('aes-256-ctr', password);
//   return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
// }
 
// var app = express();
// app.get('/remember-password', function (req, res) {
//   var pw = req.param("current_password");
//   var cryptpw = encrypt(pw);
//   // GOOD: Encoding the value before setting it.
//   res.cookie("password", cryptpw);
// });



// var pw = encrypt(req.param("current_password"));
// var app = express();
// app.get('/remember-password', function (req, res) {
//   // GOOD: Encoding the value before setting it.
//   res.cookie("password", pw1);
// });
