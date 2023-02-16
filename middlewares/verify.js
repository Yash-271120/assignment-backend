const jwt = require('jsonwebtoken');
const User = require('../models/User');

const check = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ error: 'Access Denied' });
    }

    try {
        const verified = jwt.verify(token, process.env.SECRET);
        const user = await User.findById(verified._id);
        if (!user) {
            return res.status(401).json({ error: 'Access Denied' });
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid Token' });
    }
};

module.exports = check;