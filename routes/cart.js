// Description: This file contains all the routes for the cart
const router = require('express').Router();

//import models
const Cart = require('../models/Cart');
const User = require('../models/User');
const Item = require('../models/Item');

//import middleware
const verify = require('../middlewares/verify');

// @route POST api/cart
// @desc add an item to the cart
// @access Private
router.post('/', verify, async (req, res) => {
    const { itemId } = req.body;
    const userId = req.user._id;
    const item = await Item.findById(itemId);
    const cart = await Cart.findOne({ user: userId });

    
    // Check if item exists
    if(!item){
        return res.status(400).json({ error: 'Item not found' });
    }

    // Check if cart exists else create a new cart
    if (cart) {
         cart.items.push(item._id);
         cart.totalPrice += item.price;
            try {
                const savedCart = await cart.save();
                res.json(savedCart);
            } catch (err) {
                res.status(400).json({ error: err });
            }
    }else{
        const newCart = new Cart({
            user:userId,
            items: [item._id],
            totalPrice: item.price,
        });
        try {
            const savedCart = await newCart.save();
            res.json(savedCart);
        } catch (err) {
            res.status(400).json({ error: err });
        }
    }
});


// @route DELETE api/cart/:itemId
// @desc delete an item from the cart
// @access Private
router.delete('/:itemId', verify, async (req, res) => {
    const itemId = req.params.itemId;
    const userId = req.user._id;

    const item = await Item.findById(itemId);
    const cart = await Cart.findOne({ userId: userId });

    cart.items = cart.items.filter(item => item != itemId);
    cart.totalPrice -= item.price;

    try {
        const savedCart = await cart.save();
        res.json(savedCart);
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

module.exports = router;



