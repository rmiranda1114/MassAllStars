const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Player } = require('../models/player.js');


router.post('/', (req, res, next) => {
    const id = req.body.id;
    try {
        Player.findOneAndDelete({ _id: id}, (err, doc) => {
            if (err) return res.json({ message: 'Unable to delete'});
            if (doc) return res.status(200).json({ message: 'Player Deleted'});
        });
    }catch (err) {
        next(err);
    }
    

    


})

module.exports = router;