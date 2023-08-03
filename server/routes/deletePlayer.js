const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Player } = require('../models/player.js');


router.post('/', async (req, res, next) => {
    const id = req.body.id;
    try {
        const player = await Player.findOneAndDelete({ _id: id});
        if (player._id == id) {
            return res.status(200).json({ message: 'Player Deleted'});
        } else {
            throw new Error;
        }
    }catch (err) {
        next(err);
    }
    

    


})

module.exports = router;