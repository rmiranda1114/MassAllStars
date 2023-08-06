const express = require('express');
const router = express.Router();
const {Player, validate} = require('../models/player.js');
const authorize = require('../middleware/authorize.js');

router.post('/', authorize, async (req, res, next)=> {
    try{
        //Uses Joi to validate information
        const { error, value } = validate(req.body.formData);
        if (error) return res.status(400).json({ error: error.message });

        const id = req.body.formData.id
        const newForm = req.body.formData;

        const x = await Player.findByIdAndUpdate(id);
  
            x.player.name= newForm.playerName;
            x.player.dob= newForm.playerDOB;
            x.player.age= newForm.playerAge;
            x.player.grade= newForm.playerGrade;
            x.player.parent= newForm.parentName;
            x.player.school= newForm.playerSchool;
            x.player.address.street= newForm.playerAddress;
            x.player.address.city= newForm.playerCity;
            x.player.address.state= newForm.playerState;
            x.player.address.zipcode= newForm.playerZipcode;
            x.player.phone.main= newForm.playerPhone;
            x.player.phone.alt= newForm.playerPhone2;
            x.emergencyContact.person1.name= newForm.emergencyName1;
            x.emergencyContact.person1.relationship= newForm.emergencyRelationship1;
            x.emergencyContact.person1.address.street= newForm.emergencyAddress1;
            x.emergencyContact.person1.address.city= newForm.emergencyCity1;
            x.emergencyContact.person1.address.state= newForm.emergencyState1;
            x.emergencyContact.person1.address.zipcode= newForm.emergencyZipcode1;
            x.emergencyContact.person1.phone.main= newForm.emergencyHomephone1;
            x.emergencyContact.person1.phone.alt= newForm.emergencyCellphone1;
            x.emergencyContact.person2.name= newForm.emergencyName2;
            x.emergencyContact.person2.relationship= newForm.emergencyRelationship2;
            x.emergencyContact.person2.address.street= newForm.emergencyAddress2;
            x.emergencyContact.person2.address.city= newForm.emergencyCity2;
            x.emergencyContact.person2.address.state= newForm.emergencyState2;
            x.emergencyContact.person2.address.zipcode= newForm.emergencyZipcode2;
            x.emergencyContact.person2.phone.main= newForm.emergencyHomephone2;
            x.emergencyContact.person2.phone.alt= newForm.emergencyCellphone2;
            x.sport= newForm.sport;
            x.uniformSize= newForm.uniformSize;
            x.team= newForm.team;
            x.playerNumber= newForm.playerNumber;
            x.medicalCondition= newForm.playerMedical;
            x.acknowlegment= true;

        x.save();
       
        res.status(200).json({ message: 'Player Updated'});
 
    }
    catch (ex) {
        next (ex);
    }
    
});


module.exports = router;
