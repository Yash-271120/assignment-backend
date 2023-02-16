//import modules
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = require('express').Router();

//import models
const User = require('../models/User');


// @route POST api/auth/register
// @desc Register a new user
// @access Public
router.post('/register', async (req, res) => {
    const { name, email, password, admin } = req.body;
    const emailExists = await User.findOne({ email: email });

    // Check if email already exists
    if (emailExists) {
        return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
        name,
        email,
        password: hashedPassword,
        admin,
    });

    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (err) {
        res.status(400).json({ error: err });
    }
});


// @route POST api/auth/login
// @desc Login a user
// @access Public
router.post('/login', async (req, res) => {
    const { email, password, admin } = req.body;

    // Check if User exists
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(400).json({ error: 'Email or password is wrong' });
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).json({ error: 'Email or password is wrong' });
    }

    // Create and assign a token
    const token = jwt.sign({ _id: user._id, admin }, process.env.SECRET);
    res.header('auth-token', token).json({ token });
});

module.exports = router;
