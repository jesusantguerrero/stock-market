const axios = require('axios').default;

module.exports = class StockApi {
  
  constructor() {
    this.endpoint = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY";
  }

  getInfo(symbol) {
    return axios.get(`${this.endpoint}&symbol=${symbol}&apikey=${ process.env.ALPHA_API_KEY}`)
  }

  dataKey() {
    return 'Time Series (Daily)';
  }

  parseOne(serie) {
    const data = serie[this.dataKey()];
    const names = Object.keys(data);
    return names.map((name) => [name, data[name]['1. open']])
  }
}