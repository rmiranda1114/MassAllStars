const express = require('express');
const router = express.Router();
const {Player, validate} = require('../models/player.js');
const authorize = require('../middleware/authorize.js');

router.post('/', authorize, async (req, res, next)=> {
    try{
        //Uses Joi to validate information
        // const { error, value } = validate(req.body.formData);
        // if (error) return res.status(400).json({ error = error.message });

        const { playerId, team, number } = req.body;

        const player = await Player.findById(playerId);
        player.team = team.name;
        player.playerNumber = number;
        player.teamId = team._id;

        const updatedPlayer = await player.save();
        res.status(201).send(updatedPlayer);
    }
    catch (ex) {
        next (ex);
    }
    
});

module.exports = router;
