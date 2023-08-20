const { Coach, validate } = require('../models/coach.js');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const authorize = require('../middleware/authorize.js');


router.post('/', authorize, async (req, res, next)=> {
    try{
        const { name, email, password } = req.body;
        // //Uses Joi to validate information
        // const { error, value } = validate({ name, email, password });
        // if (error) return res.status(400).json({ message: 'Unable to validate' });

        // Checks if coach already exsist.
        let coach = await Coach.findOne({ email: email });
        if (coach) return res.status(409).json({ message: 'Email is already registered.' });

        //Use bcrypt to hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        coach = new Coach({
            name: name,
            email: email,
            password: hashPassword,
            admin: false,
            refreshtoken: ""
        });
     
        //Store new coach
        const result = await coach.save();

        res.status(200).json({ message: `Coach ${result.name} created`});
    }
    catch (err) {
        next(err);
    }
    
});

module.exports = router;