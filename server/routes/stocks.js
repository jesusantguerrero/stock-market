const express = require('express');
const router = express.Router();
const StockApi = require('./../utils/stockApi');
const stockApi = new StockApi();
const Stocks = require('./../models/stocks');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const stocksResponse = [];
  Stocks.model.find((symbols) => {
    if (symbols) {
      symbols.forEach((stock) => {
        stockApi.getInfo(stock.name).then((data) => {
          stocksResponse.push({
            name: stock.name,
            data: data
          })
        })
      })
      res.json(stocksResponse);
    }
  })
});

router.get('/:symbol_name', (req, res) => {
  const symbolName = req.params.symbol_name;
  stockApi.getInfo(symbolName)
    .then((response) => {
      if (response.data) {
        Stocks.findOrCreate(symbolName)
          .then((stock) => {
            res.json({
              name: symbolName,
              data: response.data
            });
          })
          .catch((err) => {
            res.json({err: 'error'});
          })
      } else {
        res.json({ empty: ''})
      }
    }).catch((err) => {
      res.status(500).json({error: err.error})
    })
})

router.get('/add/:symbol', (req, res) => {
  const newStock = new Stocks.model({ name: req.params.symbol})
  newStock.save().then((saved) => {
    res.json(saved);
  })
  .catch((err) => {
    res.end();
  })
})

module.exports = router;