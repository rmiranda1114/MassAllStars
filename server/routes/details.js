const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Player} = require('../models/player.js');

router.get('/', async (req, res, next) => {
    const id = req.params.id;
    try{
        let players= await Player.findOne({ _id: id });
        console.log(players)
        res.status(200).send(player);
    }
    catch (err) {
        next(err);
    }
});




    


module.exports = router;