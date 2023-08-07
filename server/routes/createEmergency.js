const express = require('express');
const router = express.Router();
const EmergencyContact = require('../models/emergencyContact.js');

router.post('/', async (req, res, next)=> {
    try{
        const newForm = req.body.formData;
        let newEmergency = new EmergencyContact({
            name: newForm.emergencyName1,
            relationship: newForm.emergencyRelationship1,
            address: {
                street: newForm.emergencyAddress1,
                city: newForm.emergencyCity1,
                state: newForm.emergencyState1,
                zipcode: newForm.emergencyZipcode1
            },
            phoneMain: newForm.emergencyHomephone1,
            phoneAlt: newForm.emergencyCellphone1
        });

        const savedEmergency = await newEmergency.save();
        req.emergency = savedEmergency._id;
        next()
        
    }
    catch (ex) {
        next (ex);
    }
});

module.exports = router;