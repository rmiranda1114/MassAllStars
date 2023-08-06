const express = require('express');
const router = express.Router();
const { Player } = require('../models/player.js');
const authorize = require('../middleware/authorize.js');


router.post('/', authorize, async (req, res, next) => {
    const id = req.body.id;
    try {
        const player = await Player.findOneAndDelete({ _id: id });
        if (player._id == id) {
            return res.status(200).json({ message: `${player.player.name} has been deleted`});
        } else {
            new Error('Unable to delete player');
        }
    }catch (err) {
        next(err);
    }
    

    


})

module.exports = router;