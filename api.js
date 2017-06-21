const Env = require('./config/env')
const express = require('express')
const app = express()

const moment = require('moment')

const Mongoose = require('mongoose');
const TickerModel = require('./models/Ticker')

// Connection URL
Mongoose.connect(Env.DB_URL);
Mongoose.Promise = global.Promise

app.get('/', (req, res) => {
  TickerModel.findOne().sort({$natural:-1}).then(ticker => {
    const newDate = new Date()
    newDate.setTime(ticker.time * 1000)
    res.send(`Last update: ${newDate.toUTCString()} (${moment(ticker.time * 1000).fromNow()})`)
  })
})

app.get('/ath',(req, res) => {
  Promise.all(Env.WATCHED_PAIRS.map(pair => TickerModel.findMax(pair))).then(values => {
    res.send(values)
  })
})

app.listen(Env.API_PORT, function () {
  console.log(`API Server listening on port ${Env.API_PORT}!`)
})
