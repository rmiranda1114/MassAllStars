const { User, validate } = require('../models/user.js');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const authorize = require('../middleware/authorize.js');


router.post('/', authorize, async (req, res, next)=> {
    try{
        const { name, email, password } = req.body;
        //Uses Joi to validate information
        const { error, value } = validate({ name, email, password });
        if (error) return res.status(400).json({ message: 'Unable to validate' });

        // Checks if user already exsist.
        let user = await User.findOne({ email: email });
        if (user) return res.status(409).json({ message: 'Email is already registered.' });

        //Use bcrypt to hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        user = new User({
            name: name,
            email: email,
            password: hashPassword,
            admin: false,
            refreshtoken: ""
        });
     
        //Store new user
        const result = await user.save();

        res.status(200).json({ message: `Coach ${result.name} created`});
    }
    catch (err) {
        next(err);
    }
    
});

module.exports = router;