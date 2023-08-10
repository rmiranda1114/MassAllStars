const express = require('express');
const router = express.Router();
const {Player, validate} = require('../models/player.js');


router.post('/', async (req, res, next)=> {
    try{
        //Uses Joi to validate information
        //const { error, value } = validate(req.body.formData);
       
        //if (error) return res.status(400).json({ error: error.message });

        const newForm = req.body.formData;
        let newPlayer = new Player({
            name: newForm.name,
            dob: newForm.dob,
            age: newForm.age,
            grade: newForm.grade,
            school: newForm.school,
            sport: newForm.sport,
            uniformSize: newForm.uniformSize,
            prefNum: {
                num1: newForm.prefNum1,
                num2: newForm.prefNum2,
                num3: newForm.prefNum3
            },
            team: "",
            playerNumber: null,
            medicalCondition: newForm.medicalCondition,
            parent: newForm.parent,
            teamId: null,
            emergency: newForm.emergency
        });
        
    
        const savedPlayer = await newPlayer.save();

        res.status(201).send(savedPlayer._id);
       
        
    }
    catch (ex) {
        next (ex);
    }
    
});


module.exports = router;
