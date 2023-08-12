const express = require('express');
const router = express.Router();
const { Coach } = require('../models/coach.js');
const authorize = require('../middleware/authorize.js');




router.get('/', authorize, async (req, res, next) => {
    try{
        let coaches = await Coach.find();
        res.status(200).send(coaches);
    }
    catch (err) {
        next(err);
    }
});


    


module.exports = router;