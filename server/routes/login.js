const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
const { Coach } = require('../models/coach.js');

router.post('/', async (req, res, next) => {
   
    try {
        //Uses Joi to validate information
        const { error } = validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });
        
        // Checks if email is a coach
        let coach = await Coach.findOne({email: req.body.email});
        if (!coach) return res.status(401).json({ error: 'Invalid email or password.' });

        //Uses bcrypt to validate password
        const validPassword = await bcrypt.compare(req.body.password, coach.password);
        if (!validPassword) res.status(401).json({ error: 'Invalid email or password.' });
        //Creates JWT token
        const accessToken = coach.generateAuthToken();
        const refreshToken = coach.generateRefreshToken();
        //Saves Refresh Token in DB
        coach.refreshtoken = refreshToken;
        await coach.save();
        //Sends cookie and tokens
        await coach.sendRefreshToken(res, refreshToken);
        coach.sendAccessToken(req, res, accessToken);

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