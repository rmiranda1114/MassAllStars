const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Player} = require('../models/player.js');
const authorize = require('../middleware/authorize.js');




router.post('/', async (req, res, next) => {
    console.log(req.body.id)
    try{
        let player = await Player.findById(req.body.id);
        res.status(200).send(player);
    }
    catch (err) {
        next(err);
    }
});


    


module.exports = router;