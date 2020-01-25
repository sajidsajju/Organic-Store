const express = require('express');
const app = express();
const router = require('express').Router();
const { registerValidation, loginValidation } = require('./validation');
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) return res.json(error.details[0].message);


    const nameExist = await User.findOne({ name: req.body.name });
    if (nameExist) return res.json('*Name Already Exist! ');


    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.json('*Email Already Exist!');


    if (req.body.password !== req.body.confirm_password)
        return res.json('*Password Doesnot match!');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    const savedUser = await user.save()
        .then(() => res.json('User registered successfully ! '))
        .catch(err => res.json('Error: ' + err));


});

router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.json(201);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.json(202);

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.json(203);


    const token = jwt.sign({ _id: user._id }, process.env.USER_TOKEN_SECRET);
    res.json(token);


});

module.exports = router;