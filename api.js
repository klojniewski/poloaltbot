const express = require('express')
const app = express()

const MongoClient = require('mongodb').MongoClient
const assert = require('assert');

// Connection URL
const DB_URL = 'mongodb://localhost:27017/poloaltbot';

const WATCHED_PAIRS = ['BTC_ETH', 'BTC_LTC', 'BTC_ETC']


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
  app.listen(4000, function () {
    console.log('Example app listening on port 4000!')
  })
}


MongoClient.connect(DB_URL, function(err, db) {
  assert.equal(null, err);
  console.log('Connected successfully to server');

  listener(db)
});
