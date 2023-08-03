const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {User} = require('../models/user.js');
const authorize = require('../middleware/authorize.js');




router.get('/', authorize, async (req, res, next) => {
    try{
        let coaches = await User.find();
        res.status(200).send(coaches);
    }
    catch (err) {
        next(err);
    }
});


    


module.exports = router;