const express = require('express');
const router = express.Router();
const { Team } = require('../models/team.js');

router.post('/', async (req, res, next)=> {
    try{
        const { team } = req.body;
        let newTeam = new Team({
            name: team,
            headCoach: null,
            asstCoach: null,
            players: []
        });

        const savedTeam = await newTeam.save();
        res.status(201).json({ message: 'New Team added' })
    }
    catch (ex) {
        next (ex);
    }
});

module.exports = router;