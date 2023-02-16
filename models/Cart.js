const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: String,
    },
    items: [
        {
            type: String,
        }
    ],
    totalPrice:{
        type: Number,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('Cart', cartSchema);