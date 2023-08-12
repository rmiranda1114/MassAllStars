const express = require('express');
const router = express.Router();
const { Team } = require('../models/team.js');
const authorize = require('../middleware/authorize.js');



router.get('/', authorize, async (req, res, next) => {
    try{
        let teams = await Team.find();
        res.status(200).send(teams);
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;