# TODO

## Front-end

- display table of tracked currencies
- optimise api.js: `/get-all/` db queries

## Trading

- watch for ticker update
- check if ticker currency is watched pair
- check if ticker price is higher than (10 or 20) days high
-- if it is: create Trade: { buyPrice: currentTickerPrice, stopLoss: currentTickerPrice - 7 days ATR, target: 3x stopLoss}
- check if we have Trades for Ticker Pair, if yes
-- check if price is below stopLoss - if yes - sell
-- check if price is above buyPrice - if yes - popup the stopLoss
