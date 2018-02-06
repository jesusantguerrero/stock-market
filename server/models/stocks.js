const mongoose = require('mongoose');

class Stock {
  constructor() {
    this.model = new mongoose.model('stock', mongoose.Schema({
      name: String
    }))
  }


  findOrCreate(stockName) {
    this.model.findOne({ name: stockName}).then((stock) => {
      if (!stock) {
        return this.create(stockName);
      }
      return stock;
    })
  }

  create(stockName) {
    return this.model.create({ name: stockName })
  }

  delete(stockName) {
    return this.model.findOneAndDelete({ name: stockName })
  }
}

module.exports = new Stock();