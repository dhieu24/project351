const StockModel = require('./stock')

const getStock = async (req, res) => {
    try {
        const stockName = req.params.stockName;
        const stocks = await StockModel.find({}).sort({ timestamp: -1 }).limit(1);

        const formattedStocks = stocks.map(stock => ({
            name: stock.s,
            currentPrice: stock.p,
            timestamp: stock.t
        }));
    
        console.log(formattedStocks);
        res.send(formattedStocks);
    } catch (error) {
        res.status(500).send('Error getting stock data');
    }
}

module.exports = {
    getStock,
}