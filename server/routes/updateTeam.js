const express = require('express');
const router = express.Router();
const { Team } = require('../models/team.js');

router.post('/', async (req, res, next)=> {
    try{
        const { headCoach, asstCoach, teamId } = req.body;

        const team = await Team.findByIdAndUpdate(teamId);

        team.headCoach = headCoach || team.headCoach;
        team.asstCoach = asstCoach || team.asstCoach;

        await team.save();
        next();
    }
    catch (ex) {
        next (ex);
    }
});

router.post('/', async (req, res, next)=> {
    try{
        const savedTeam = await Team.findById(req.body.teamId)
        .populate('headCoach', 'name')
        .populate('asstCoach', 'name')
        .populate('players');
        res.status(201).send(savedTeam);
    }
    catch (ex) {
        next (ex);
    }
});

router.post('/removePlayer', async (req, res, next)=> {
    try{
        const team = await Team.findById(req.body.teamId);
        const index = team.players.indexOf(req.body.playerId);
        team.players.splice(index, 1);
        const result = await team.save()
        next();
    }
    catch (ex) {
        next (ex);
    }
});

router.post('/removePlayer', async (req, res, next)=> {
    try{
        const savedTeam = await Team.findById(req.body.teamId)
        .populate('headCoach', 'name')
        .populate('asstCoach', 'name')
        .populate('players');
        res.status(201).send(savedTeam);
    }
    catch (ex) {
        next (ex);
    }
});

module.exports = router;