const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const tickerSchema = new Schema({
  currencyPair: String,
  exchange: String,
  last: Number,
  lowestAsk: Number,
  highestBid: Number,
  percentChange: Number,
  baseVolume: Number,
  quoteVolume: Number,
  isFrozen: Number,
  dayHigh: Number,
  dayLow: Number,
  time: Number
});

module.exports = mongoose.model('Ticker', tickerSchema);
