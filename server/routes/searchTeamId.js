const express = require('express');
const router = express.Router();
const { Team } = require('../models/team.js');
const authorize = require('../middleware/authorize.js');

router.post('/', authorize, async (req, res, next) => {
   
    try{
        const { teamId } = req.body;
        const team = await Team.findById(teamId)
        .populate(['headCoach', 'asstCoach']);

        res.status(200).send(team);    
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;