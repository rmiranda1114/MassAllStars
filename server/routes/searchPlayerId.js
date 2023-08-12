const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Player } = require('../models/player.js');
const authorize = require('../middleware/authorize.js');

router.post('/', authorize, async (req, res, next) => {
    
    try{
        let player = await Player.findById(req.body.playerId);
        res.status(201).send(player);
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;