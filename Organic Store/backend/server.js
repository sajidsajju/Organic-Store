const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
port = 5000;
const authRoute = require('./routes/auth');
const adminAuthRoute = require('./Admin_Routes/adminAuth');
const productData = require('./Admin_Routes/productData');
const userProductData = require('./routes/userProductData');




dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => { console.log('connected to DB') }
);

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use('/api/user', authRoute);
app.use('/api/admin', adminAuthRoute);
app.use('/api', productData);
app.use('/user', userProductData);
app.use('/uploads', express.static('uploads'));

app.listen(port, () => { console.log(`server is running on port ${port}`) });