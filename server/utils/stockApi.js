const axios = require('axios').default;

module.exports = class StockApi {
  
  constructor() {
    this.endpoint = "https://www.quandl.com/api/v3/datasets/WIKI/";
  }

  getInfo(symbol) {
    return axios.get(`${this.endpoint}/${symbol}.json?api_key=${process.env.QUANDL_API_KEY}`)
  }
}