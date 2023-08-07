const express = require('express');
const router = express.Router();
const {Player, validate} = require('../models/player.js');
const { Parent } = require('../models/parent.js');


router.post('/', async (req, res, next)=> {
    try{
        //Uses Joi to validate information
        //const { error, value } = validate(req.body.formData);
       
        //if (error) return res.status(400).json({ error: error.message });

        const newForm = req.body.formData;
        let newPlayer = new Player({
            name: newForm.playerName,
            dob: newForm.playerDOB,
            age: newForm.playerAge,
            grade: newForm.playerGrade,
            school: newForm.playerSchool,
            sport: newForm.sport,
            uniformSize: newForm.uniformSize,
            prefferedNumber: {
                uniformNumber1: newForm.uniformNumber1,
                uniformNumber2: newForm.uniformNumber2,
                uniformNumber3: newForm.uniformNumber3
            },
            team: "",
            playerNumber: null,
            medicalCondition: newForm.playerMedical,
            parentId: req.parent,
            teamId: null,
            emergencyContact: [req.emergency]
        });
        
    
        const savedPlayer = await newPlayer.save();
        
        const parent = await Parent.findById(req.parent);
        parent.kids = [savedPlayer._id];
        await parent.save();

        res.status(201).json({ message: "Player has been successfully registered"});
       
        
    }
    catch (ex) {
        next (ex);
    }
    
});


module.exports = router;
