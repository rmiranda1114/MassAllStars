const {User, validate} = require('../models/user.js');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const authorize = require('../middleware/authorize.js');


router.post('/', authorize, async (req, res, next)=> {
   
    try{
        //Uses Joi to validate information
        const { error, value } = validate(req.body);
        if (error) return res.status(400).json({ message: 'Unable to validate' });

        // Checks if user already exsist.
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(409).json({ message: 'Email is already registered.' });

        //Creates new user using Lodash
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            admin: false,
            refreshtoken: ""
        });
       //Use bcrypt to hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        //Store new user
        const result = await user.save();

        res.status(200).json({ message: 'User Created', user: user.email });
    }
    catch (err) {
        next(err);
    }
    
});

module.exports = router;