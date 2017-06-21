const express = require('express')
const app = express()

const MongoClient = require('mongodb').MongoClient
const assert = require('assert');

// Connection URL
const DB_URL = 'mongodb://localhost:27017/poloaltbot';

const WATCHED_PAIRS = [
  'BTC_XMR',
  'BTC_MAID',
  'BTC_ETH',
  'BTC_BTCD',
  'BTC_BTS',
  'BTC_DGB',
  'BTC_DOGE',
  'BTC_NMC',
  'BTC_PPC',
  'BTC_QORA',
  'BTC_SILK',
  'BTC_SYS',
  'BTC_XRP',
  'USDT_BTC']

const listener = function (db) {
  const tickersCollection = db.collection('tickers');

  app.get('/', function (req, res) {
    const lastRecord = tickersCollection.findOne({}, { sort:{$natural:-1}}, function (err, document) {
      var newDate = new Date();
      newDate.setTime(document.time * 1000);
      dateString = newDate.toUTCString();
      res.send(dateString)
    })
  })
  app.get('/stats', function (req, res) {
    // max
    // db.getCollection('tickers').find({"currencyPair": 'BTC_ETH'}).sort({ "highestBid": -1}).limit(1)
    // min
    // db.getCollection('tickers').find({"currencyPair": 'BTC_ETH'}).sort({ "highestBid": 1}).limit(1)
    
  })
  app.listen(4000, function () {
    console.log('Example app listening on port 4000!')
  })
}


MongoClient.connect(DB_URL, function(err, db) {
  assert.equal(null, err);
  console.log('Connected successfully to server');

  listener(db)
});
