// Description: This file contains all the routes for the admin section of the website
const router = require('express').Router();
const { uuid } = require('uuidv4');
const {N} = require('../contants')
const verify = require('../middlewares/verify');


//import models
const DiscountCode = require('../models/DiscountCode');
const Order = require('../models/Order');
const Item = require('../models/Item');


// @route GET api/admin/generate
// @desc Generate a new discount code
// @access Private

router.get('/generate',verify, async (req, res) => {

    if(!req.user.admin){
        return res.status(400).json({ error: 'Access Denied' });
    }

    const orders = await Order.find();

    if(orders.length%N !== 0){
        return res.status(400).json({ error: 'discount code cannot be generated now' });
    }

    const newDiscountCode = new DiscountCode({
        code: uuid(),
        discountGiven: 10,
        used: false
    });

    try {
        const savedDiscountCode = await newDiscountCode.save();
        res.json(savedDiscountCode);
    } catch (err) {
        res.status(400).json({ error: err });
    }
});


// @route GET api/admin/data
// @desc Get data for admin dashboard
// @access Private
router.get('/data',verify, async (req, res) => {
    
        if(!req.user.admin){
            return res.status(400).json({ error: 'Access Denied' });
        }
    
        const orders = await Order.find();
        const discountCodes = await DiscountCode.find();

        const discountCodeList = discountCodes.map((discountCode) => {
            return {code:discountCode.code,used:discountCode.used};
        });
    
        let totalPurchaseAmount = 0;
        let totalDiscountedAmount = 0;
        let totalItemsPurchased = 0;

        const itemIds = orders.map((order) => {
            totalPurchaseAmount += order.totalPrice;
            totalDiscountedAmount += order.discountedPrice;
            return order.items
        });
        const mergeditemIds = [].concat.apply([], itemIds);
        totalItemsPurchased = mergeditemIds.length;       
        
       return res.json({
            count_of_items_purchased: totalItemsPurchased,
            total_purchase_amount: totalPurchaseAmount,
            total_discounted_amount: totalDiscountedAmount,
            list_of_discount_codes: discountCodeList,
        });
});

module.exports = router;