const Env = require('./config/env')
const express = require('express')
const app = express()

const Mongoose = require('mongoose');
const TickerModel = require('./models/Ticker')

// Connection URL
Mongoose.connect(Env.DB_URL);
Mongoose.Promise = global.Promise

app.get('/', function (req, res) {
  TickerModel.findOne().sort({$natural:-1}).then(ticker => {
    const newDate = new Date()
    newDate.setTime(ticker.time * 1000)
    res.send(newDate.toUTCString())
  })
})
app.listen(Env.API_PORT, function () {
  console.log(`API Server listening on port ${Env.API_PORT}!`)
})
