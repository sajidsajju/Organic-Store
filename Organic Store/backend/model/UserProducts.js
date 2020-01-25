const mongoose = require('mongoose');

const UserProductsSchema = new mongoose.Schema({

    pid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true

    },
    cartuser: {
        type: mongoose.Schema.Types.ObjectId

    },
    adminuser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }

});

module.exports = mongoose.model('UserProduct', UserProductsSchema);