const mongoose = require('mongoose')

const StockSchema = new mongoose.Schema({
    c: {
        type: Array,
        required: true
    },
    p: {
        type: Number,
        required: true
    },
    s: {
        type: String,
        required: true
    },
    t: {
        type: Number,
        required: true
    },
    v: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const StockModel = mongoose.model('stocks', StockSchema)

module.exports = StockModel