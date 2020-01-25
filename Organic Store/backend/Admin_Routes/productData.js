const router = require('express').Router();
const verify = require('./adminVerifyToken');
const Product = require('../Admin_Model/Products');
const multer = require('multer');
// const upload = multer({dest: 'uploads/'});
const fs = require('fs');
const UserProducts = require('../model/UserProducts');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }

});

const fileFilter = (req, file, cb) => {
    {
        (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') ? cb(null, true) : cb(null, false);
    }
}

const upload = multer({
    storage: storage, limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter

});


router.get('/singleproduct/:id', verify, async (req, res) => {
    await Product.findById(req.params.id)
        .then(response => res.json(response))
        .catch(err => res.status(400).json('Error' + err));
});

router.delete('/delete/:id', verify, async (req, res) => {
    await Product.find({ _id: req.params.id })
        .select("productImage")
        .exec()
        .then(response => fs.unlink('./uploads/' + response[0].productImage, function (err) {
            if (err) res.json(err);
        }))
        .catch(err => res.status(400).json('Error' + err));

    await Product.findByIdAndDelete(req.params.id)
        .then(response => res.json('Item Deleted!'))
        .catch(err => res.status(400).json('Error' + err));


    await UserProducts.deleteMany({ pid: req.params.id })
        .then(response => res.json('Item Deleted!'))
        .catch(err => res.status(400).json('Error' + err));

});

router.post('/update/:id', upload.single('productImage'), verify, async (req, res) => {
    await Product.findById(req.params.id)
        .then(response => {
            // user: req.admin,
            response.title = req.body.title,
                response.description = req.body.description,
                response.price = req.body.price

            response.save()
                .then(response => res.json('Item Updated!'))
                .catch(err => res.status(400).json('Error' + err));
        })
        .catch(err => res.status(400).json('Error' + err));
});


router.get('/user-products-list', verify, async (req, res) => {
    await Product.find({ user: req.admin._id })
        .select("_id productImage title description price")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                productsList: docs.map(doc => {
                    return {
                        // user: doc.user,
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


router.get('/products-list', verify, async (req, res) => {
    await Product.find()
        .select("_id productImage title description price")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                productsList: docs.map(doc => {
                    return {
                        // user: doc.user,
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


router.post('/products', upload.single('productImage'), verify, async (req, res) => {

    const products = new Product({
        user: req.admin,
        productImage: req.file.filename,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    })

    await products.save()
        .then(() => res.json('Product saved successfully ! '))
        .catch(err => res.status(400).json('Error: ' + err));


});


module.exports = router;