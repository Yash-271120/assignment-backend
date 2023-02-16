const mongoose = require('mongoose');

const discountCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    discountGiven: {
        type: Number,
        default: 10,
    },
    used:{
        type: Boolean,
        default: false,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },

});

module.exports = mongoose.model('DiscountCode', discountCodeSchema);