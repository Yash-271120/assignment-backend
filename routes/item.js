// Description: This file contains all the routes for the items
const router = require('express').Router();

//import models
const Item = require('../models/Item');


// @route GET api/items
// @desc Get all items
// @access Public
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(400).json({ error: err });
    }
});


// @route GET api/items/:id
// @desc Get a specific item
// @access Public
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        res.json(item);
    } catch (err) {
        res.status(400).json({ error: err });
    }
});


// @route POST api/items
// @desc Create a new item
// @access Public
router.post('/', async (req, res) => {
    const { name, price } = req.body;
    const item = new Item({
        name,
        price,
    });

    try {
        const savedItem = await item.save();
        res.json(savedItem);
    } catch (err) {
        res.status(400).json({ error: err });
    }
});


// @route DELETE api/items/:id
// @desc Delete a specific item
// @access Public
router.delete('/:id', async (req, res) => {
    try {
        const removedItem = await Item.deleteOne({ _id: req.params.id });
        res.json(removedItem);
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

module.exports = router;