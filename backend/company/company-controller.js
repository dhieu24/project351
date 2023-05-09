const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "cgje8rhr01qt0jk10ff0cgje8rhr01qt0jk10ffg"
const finnhubClient = new finnhub.DefaultApi()

const getCompanyProfile = (req, res) => {
    console.log('12345')
    try {
        const stockName = req.params.stockName
        console.log(stockName)
    
        const data = finnhubClient.companyProfile2({'symbol': stockName}, (error, data, response) => {
            console.log(data)
            console.log(response.body.country)
            res.send(data)
        });
    
        // console.log('yo')
        // res.send(data)
    } catch (error) {
        res.status(500).send('Error getting company profile');
    }
}

module.exports = {
    getCompanyProfile
}