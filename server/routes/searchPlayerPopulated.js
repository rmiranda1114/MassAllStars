const express = require('express');
const router = express.Router();
const { Player } = require('../models/player.js');
const authorize = require('../middleware/authorize.js');

router.post('/', authorize, async (req, res, next) => {
   
    try{
        const playerId = req.body.playerId;
        const player = await Player.findById(playerId)
        .populate(['parentId', 'emergencyContact']);

        res.status(200).send(player);    
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;