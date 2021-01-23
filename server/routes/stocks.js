const express = require('express');
const router = express.Router();
const StockApi = require('./../utils/stockApi');
const stockApi = new StockApi();
const Stocks = require('./../models/stocks');

/* GET users listing. */
router.get('/', (req, res, next) => {
  const stocksResponse = [];

  Stocks.model.find()
    .then((stockList) => {
      res.json(stockList.filter(stock => stock.name).map((stock) => stock.name));
    }).catch((e) => {
      console.log(e)
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
              data: stockApi.parseOne(response.data)
            });
          })
          .catch((err) => {
            console.log(err);
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

router.delete('/:symbol_name', (req, res) => {
  Stocks.model.deleteOne({ name: req.params.symbol_name })
    .then((data) => {
      if (data) {
        res.end('deleted');
      }
      res.end();
    })
})

router.get('/delete/all', (req, res) => {
  Stocks.model.deleteMany().then((deleted) => res.json(releted))
})

module.exports = router;
