const express = require('express')
const router = express.Router()

const companyController = require('./company-controller')

router.get('/:stockName', companyController.getCompanyProfile)
router.get('/:stockName/predict', companyController.getPrediction)

module.exports = router
