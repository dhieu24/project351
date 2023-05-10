const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "cgje8rhr01qt0jk10ff0cgje8rhr01qt0jk10ffg"
const finnhubClient = new finnhub.DefaultApi()

const getCompanyProfile = (req, res) => {
    console.log('12345')
    try {
        const stockName = req.params.stockName
        console.log(stockName)
        let {PythonShell} = require('python-shell')
        console.log("sai k")
        let pyshell = new PythonShell('C:/Users/DELL/project351/backend/chart/group_3_prediction_function.py')
        console.log("dung k?")
        //pyshell.send(stockName);
        const options = {
            args: [stockName]
        };
        console.log("dmdmdmdm")
        PythonShell.run('C:/Users/DELL/project351/backend/chart/group_3_prediction_function.py', options).then(results => {
           console.log(results);


             const data = finnhubClient.companyProfile2({'symbol': stockName}, (error, data, response) => {

                const resData = {
                    predictedPrice: results[1],
                    ...data
                }

                console.log(resData)
                // console.log(data)
                res.send(resData)
            });
          }).catch(err => {
            console.error(err);
            res.status(500).send('Error running prediction function');
          });
        // const data = finnhubClient.companyProfile2({'symbol': stockName}, (error, data, response) => {
        //     console.log(data)
        //     console.log(response.body.country)
        //     res.send({data, a})
        // });
    
        // console.log('yo')
        // res.send(data)
    } catch (error) {
        res.status(500).send('Error getting company profile');
    }
}

module.exports = {
    getCompanyProfile
}