const VOLUME_LIMIT = 1000
const autobahn = require('autobahn')
const Mongoose = require('mongoose');
const TickerModel = require('./models/ticker')

// Connection URL
const DB_URL = 'mongodb://localhost:27017/poloaltbot-2';
// POLONIEX URL
const API_WS_URL = "wss://api.poloniex.com";

class TickerLogger {
  constructor () {
    Mongoose.connect(DB_URL);
    Mongoose.Promise = global.Promise
  }
  init () {
    console.info("TickerLogger Init");
    const connection = new autobahn.Connection({
      url: API_WS_URL,
      realm: "realm1",
      max_retries: -1
    });
    connection.onopen = session => {
      console.info("Websocket connection oppened");
      session.subscribe('ticker', this.tickerLogger);
    }
    connection.onclose = () => {
      console.info("Websocket connection closed");
    }
    console.info("Websocket starts to open");
    connection.open();
  }
  tickerLogger (args, kwargs) {
    if (args[0].includes('BTC_') && Number(args[5]) > VOLUME_LIMIT) {
      const tickerUpdate = {
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
      TickerModel(tickerUpdate).save(error => {
        if (error) {
          console.error(error)
          process.exit()
        }
      })
    }
  }
}

const poloTicker = new TickerLogger()
poloTicker.init()
