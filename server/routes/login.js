const mongoose = require('mongoose'); // dont need?
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
require('dotenv').config(); // dont need?
const { User } = require('../models/user.js');

router.post('/', async (req, res, next) => {
   
    try {
        //Uses Joi to validate information
        const { error } = validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });
        
        // Checks if email is a user
        let user = await User.findOne({email: req.body.email});
        if (!user) return res.status(401).json({ error: 'Invalid email or password.' });

        //Uses bcrypt to validate password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) res.status(401).json({ error: 'Invalid email or password.' });
        //Creates JWT token
        const accessToken = user.generateAuthToken();
        const refreshToken = user.generateRefreshToken();
        //Saves Refresh Token in DB
        user.refreshtoken = refreshToken;
        await user.save();
        //Sends cookie and tokens
        user.sendRefreshToken(res, refreshToken);
        //Remember to delete refreshToken
        user.sendAccessToken(req, res, accessToken, refreshToken);

    }
    catch (ex) {
        next (ex);
    }
    
});


function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    })
    return  schema.validate(req);
}

module.exports = router;