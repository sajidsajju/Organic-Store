const express = require('express');
const app = express();
const router = require('express').Router();
const { registerValidation, loginValidation } = require('./adminValidation');
const Admin = require('../Admin_Model/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verify = require('./adminVerifyToken');


router.post('/register', async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) return res.json(error.details[0].message);


    const nameExist = await Admin.findOne({ name: req.body.name });
    if (nameExist) return res.json('*Name Already Exist! ');


    const emailExist = await Admin.findOne({ email: req.body.email });
    if (emailExist) return res.json('*Email Already Exist!');

    if (req.body.password !== req.body.confirm_password)
        return res.json('*Password Doesnot match!');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    const savedUser = await user.save()
        .then(() => res.json('Admin registered successfully ! '))
        .catch(err => res.json('Error: ' + err));


});

router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.json(201);

    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) return res.json(202);

    const validPass = await bcrypt.compare(req.body.password, admin.password);
    if (!validPass) return res.json(203);

    const token = jwt.sign({ _id: admin._id }, process.env.TOKEN_SECRET);
    res.json(token);


});

module.exports = router;