const express = require('express');
const router = express.Router();
const { Team } = require('../models/team.js');
const authorize = require('../middleware/authorize.js');


router.post('/', authorize, async(req, res, next) => {
    const id = req.body.teamId;
    try {
        const team = await Team.findOneAndDelete({ _id: id });
            if (team._id == id) {
                return res.status(200).json({ message: `Team ${team.name} has been deleted`});
            } else {
                new Error('Unable to Delete');
            }
    }catch (err) {
        next(err);
    }
})

module.exports = router