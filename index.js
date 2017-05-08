const VOLUME_LIMIT = 7000
const autobahn = require('autobahn')
const MongoClient = require('mongodb').MongoClient
const assert = require('assert');

// Connection URL
const DB_URL = 'mongodb://localhost:27017/poloaltbot';

const API_WS_URL = "wss://api.poloniex.com";
var connection = new autobahn.Connection({
  url: API_WS_URL,
  realm: "realm1"
});


const listener = function (db) {
  const tickersCollection = db.collection('tickers');

  connection.onopen = function (session) {
    function tickerEvent (args, kwargs) {
      if (args[0].includes('BTC_') && Number(args[5]) > VOLUME_LIMIT) {
        const tickerModel = {
          currencyPair: args[0],
          last: Number(args[1]),
          lowestAsk: Number(args[2]),
          highestBid: Number(args[3]),
          percentChange: Number(args[4]),
          baseVolume: Number(args[5]),
          quoteVolume: Number(args[6]),
          isFrozen: Number(args[7]),
          dayHigh: Number(args[8]),
          dayLow : Number(args[9]),
          time: Math.floor(Date.now() / 1000)
        }

        console.log(args[0] + ' is: ' + Number(args[5]));
        console.log(tickersCollection)
        tickersCollection.insertOne(tickerModel, function (error, r) {
          console.log(r)
        })
      }
    }
    session.subscribe('ticker', tickerEvent);
  }

  connection.onclose = function () {
    console.log("Websocket connection closed");
  }
  connection.open();
}

MongoClient.connect(DB_URL, function(err, db) {
  assert.equal(null, err);
  console.log('Connected successfully to server');

  listener(db)
});
