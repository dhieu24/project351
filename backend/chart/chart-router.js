const express = require('express')
const router = express.Router()

const chartController = require('./chart-controller')

router.get('/test/:stockName', chartController.getStock)

module.exports = router
