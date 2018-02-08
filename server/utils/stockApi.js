const axios = require('axios').default;

module.exports = class StockApi {
  
  constructor() {
    this.endpoint = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY";
  }

  getInfo(symbol) {
    return axios.get(`${this.endpoint}&symbol=${symbol}&interval=1min&apikey=${ process.env.ALPHA_API_KEY}`)
  }

  dataKey() {
    return 'Time Series (Daily)';
  }

  parseOne(serie) {
    const data = serie[this.dataKey()];
    const names = Object.keys(data);
    return names.map((name) => {
      return [new Date(name).getTime(), parseFloat(data[name]['1. open'])]
    })
  }
}