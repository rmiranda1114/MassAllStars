const express = require('express');
const router = express.Router();
const {Player, validate} = require('../models/player.js');
const authorize = require('../middleware/authorize.js');

router.post('/', authorize, async (req, res, next)=> {
    try{
        //Uses Joi to validate information
        // const { error, value } = validate(req.body.formData);
        // if (error) return res.status(400).json({ error = error.message });

        const id = req.body.formData.id
        const newForm = req.body.formData;

        const player = await Player.findByIdAndUpdate(id);
        player.name = newForm.playerName || player.name,
        player.dob = newForm.playerDOB || player.dob,
        player.age = newForm.playerAge || player.age,
        player.grade = newForm.playerGrade || player.grade,
        player.school = newForm.playerSchool || player.school,
        player.sport = newForm.sport || player.sport,
        player.uniformSize = newForm.uniformSize || player.uniformSize,
        player.team = newForm.team || player.team,
        player.playerNumber = newForm.playerNumber || player.playerNumber,
        player.medicalCondition = newForm.playerMedical || player.medicalCondition

        const updatedPlayer = await player.save();
        req.parent = player.parentId;
        req.emergencyContact = player.emergencyContact;
        next();
    }
    catch (ex) {
        next (ex);
    }
    
});

module.exports = router;
