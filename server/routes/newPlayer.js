const express = require('express');
const router = express.Router();
const {Player, validate} = require('../models/player.js');




router.post('/', async (req, res, next)=> {
    try{
        //Uses Joi to validate information
        const { error, value } = validate(req.body.formData);
        console.log('test');
        if (error) return res.status(400).json({ error: error.message });

        const newForm = req.body.formData;
        let newPlayer = new Player({
            player: {
                name: newForm.playerName,
                dob: newForm.playerDOB,
                age: newForm.playerAge,
                grade: newForm.playerGrade,
                parent: newForm.parentName,
                school: newForm.playerSchool,
                address: {
                    street: newForm.playerAddress,
                    city: newForm.playerCity,
                    state: newForm.playerState,
                    zipcode: newForm.playerZipcode
                },
                phone: {
                    main: newForm.playerPhone,
                    alt: newForm.playerPhone2
                },
            },
            emergencyContact: {
                person1: {
                    name: newForm.emergencyName1,
                    relationship: newForm.emergencyRelationship1,
                    address: {
                        street: newForm.emergencyAddress1,
                        city: newForm.emergencyCity1,
                        state: newForm.emergencyState1,
                        zipcode: newForm.emergencyZipcode1
                    },
                    phone: {
                        main: newForm.emergencyHomephone1,
                        alt: newForm.emergencyCellphone1
                    }
                },
                person2: {
                    name: newForm.emergencyName2,
                    relationship: newForm.emergencyRelationship2,
                    address: {
                        street: newForm.emergencyAddress2,
                        city: newForm.emergencyCity2,
                        state: newForm.emergencyState2,
                        zipcode: newForm.emergencyZipcode2
                    },
                    phone: {
                        main: newForm.emergencyHomephone2,
                        alt: newForm.emergencyCellphone2
                    }
                }
            },
            sport: newForm.sport,
            uniformSize: newForm.uniformSize,
            uniformNumber1: newForm.uniformNumber1,
            uniformNumber2: newForm.uniformNumber2,
            uniformNumber3: newForm.uniformNumber3,
            team: "",
            playerNumber: null,
            medicalCondition: newForm.playerMedical,
            acknowlegment: newForm.acknowlegment
           
        });
    
        const result = await newPlayer.save();
        
    
        res.status(201).json(result);
 
    }
    catch (ex) {
        next (ex);
    }
    
});


module.exports = router;
