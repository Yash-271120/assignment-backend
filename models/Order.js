const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: String,
    },
    items: [
        {
            type: String,
        }
    ],
    created_at: {
        type: Date,
        default: Date.now(),
    },
    discountCode:{
        type: String,
    },
    totalPrice:{
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Order', orderSchema);