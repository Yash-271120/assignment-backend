// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//import routes
const authRoute = require('./routes/auth');

//create express app
const app = express();
dotenv.config();

//setup middleware
app.use(express.json());

//connect to MongoDB
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to MongoDB...');
})


//import routes
//TODO: remove this test route
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use('/api/user', authRoute);

//server listening
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});