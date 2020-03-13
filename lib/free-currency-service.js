require('dotenv').config();
const axios = require('axios');

const api = axios.create({
  baseURL: 'https://free.currconv.com/api/v7/',
  timeout: Number(process.env.TIMEOUT) || 5000,
});

module.exports = {
  convertCurrency: async (from, to) => {
  	try{
    const response = await api.get(`/convert?apiKey=`+process.env.CONVERTER_KEY+`&q=${from}_${to}&compact=y`);
    const key = Object.keys(response.data)[0];
    const { val } = response.data[key];
    return { rate: val };
    }
    catch(e){
 	console.log(e)
 	}
  },
};
