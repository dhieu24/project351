const StockModel = require('./stock')
const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "cgje8rhr01qt0jk10ff0cgje8rhr01qt0jk10ffg"
const finnhubClient = new finnhub.DefaultApi()

const getStock = async (req, res) => {
    try {
        const stockName = req.params.stockName;
        console.log(stockName)
        const stocks = await StockModel.find({s: stockName}).sort({ t: -1 }).limit(1);
        console.log(stocks)
        const formattedStocks = stocks.map(stock => ({
             name: stock.s,
             currentPrice: stock.p,
             timestamp: stock.t,
         }));
    
         console.log('???????=====')
         console.log(formattedStocks);
         res.send(formattedStocks);
    } catch (error) {
        res.status(500).send('Error getting stock data');
    }
}

module.exports = {
    getStock,
}