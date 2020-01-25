const router = require('express').Router();
const verify = require('./verifyToken');
const Product = require('../Admin_Model/Products');
const UserProduct = require('../model/UserProducts');


router.delete('/delete/:id', verify, async (req, res) => {

    await UserProduct.findByIdAndDelete(req.params.id)
        .then(response => res.json('Item Deleted!'))
        .catch(err => res.status(400).json('Error' + err));

});

router.get('/products-list', verify, async (req, res) => {
    await Product.find()
        .select("_id user productImage title description price")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                productsList: docs.map(doc => {
                    return {
                        user: doc.user,
                        _id: doc._id,
                        productImage: doc.productImage,
                        title: doc.title,
                        description: doc.description,
                        price: doc.price
                    }
                })
            }

            res.status(200).json(response);
        })
        .catch(err => res.status(400).json('Error: ' + err));

});

router.get('/add-user-cart/:id', verify, async (req, res) => {

    await UserProduct.find({ cartuser: req.cuser._id })
        .then(docs => {
            let duplicate = false;

            docs.map(doc => {

                if (doc.pid == req.params.id) {
                    duplicate = true;
                    return;

                }
            })

            if (duplicate) {
                res.json('Product already saved to user cart ! ');
            }
            else {

                Product.findById(req.params.id)
                    .select("_id user productImage title description price")
                    .exec()
                    .then(doc => {
                        const userproduct = new UserProduct({
                            pid: doc._id,
                            adminuser: doc.user,
                            cartuser: req.cuser._id,
                            productImage: doc.productImage,
                            title: doc.title,
                            description: doc.description,
                            price: doc.price
                        })
                        userproduct.save()
                        res.json('Product saved to user cart ! ');
                    })
                    .catch(err => res.status(400).json('Error' + err));
            }
        })
        .catch(err => res.status(400).json('Error' + err));

});

router.get('/user-products-list', verify, async (req, res) => {
    await UserProduct.find({ cartuser: req.cuser._id })
        .select("_id pid adminuser cartuser productImage title description price")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                productsList: docs.map(doc => {
                    return {
                        _id: doc._id,
                        pid: doc.pid,
                        adminuser: doc.adminuser,
                        cartuser: doc.cartuser,
                        productImage: doc.productImage,
                        title: doc.title,
                        description: doc.description,
                        price: doc.price
                    }
                })
            }

            res.status(200).json(response);
        })
        .catch(err => res.status(400).json('Error: ' + err));

});


module.exports = router;