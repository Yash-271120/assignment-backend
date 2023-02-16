// Description: This file contains all the routes for the order.
const router = require('express').Router();
const verify = require('../middlewares/verify');
const {N} = require('../contants')


//import models
const DiscountCode = require('../models/DiscountCode');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const User = require('../models/User');


// @route POST api/order/create
// @desc Create a new order
// @access Private
router.post('/create',verify, async (req, res) => {
    const { cartId, discountCode } = req.body;

    const cart = await Cart.findById(cartId);
    const orders = await Order.find();
    const discount = await DiscountCode.findOne({ code: discountCode });
    const user = await User.findById(req.user._id);

    // check for validity of discount
    if(!discount){
        return res.status(400).json({ error: 'Invalid discount code' });
    }
    
    if(discount.used){
        return res.status(400).json({ error: 'discount code has already been used' });
    }

    if(orders.length%N !== 0){
        return res.status(400).json({ error: 'discount code cannot be applied now' });
    }


    // calculate discounted price
    const discountedPrice = cart.totalPrice - (cart.totalPrice*(discount.discountGiven/100));

    const newOrder = new Order({
        userId: req.user._id,
        items: cart.items,
        discountCode: discountCode,
        totalPrice: cart.totalPrice,
        discountedPrice: discountedPrice
    });

    try {
        const savedOrder = await newOrder.save();
        discount.used = true;
        await discount.save();
        await Cart.findByIdAndDelete(cartId);
        user.orders.push(savedOrder._id);
        await user.save();
        res.json(savedOrder);
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

module.exports = router;