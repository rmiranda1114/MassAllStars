const express = require('express');
const router = express.Router();
const {Player} = require('../models/player.js');
const authorize = require('../middleware/authorize.js');




router.get('/', authorize, async (req, res, next) => {
    try{
        let players = await Player.find();
        res.status(200).send(players);
    }
    catch (err) {
        next(err);
    }
});




    


module.exports = router;