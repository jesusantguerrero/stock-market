const mongoose = require('mongoose');

class Stock {
  constructor() {
    this.model = mongoose.model('stock', new mongoose.Schema({
      name: String
    }));
  }

  findOrCreate(stockName) {
    return this.model.findOne({ name: stockName })
      .then((stock) => {
        console.log(stock)
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