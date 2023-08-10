const express = require('express');
const router = express.Router();
const EmergencyContact = require('../models/emergencyContact.js');

router.post('/', async (req, res, next)=> {
    try{
        const newForm = req.body.formData;
        let newEmergency = new EmergencyContact({
            name: newForm.name,
            relationship: newForm.relationship,
            address: {
                street: newForm.street,
                city: newForm.city,
                state: newForm.state,
                zipcode: newForm.zipcode
            },
            phoneMain: newForm.phoneMain,
            phoneAlt: newForm.phoneAlt,
            player: []
        });

        const savedEmergency = await newEmergency.save();
        res.status(201).send(savedEmergency._id);
        
    }
    catch (ex) {
        next (ex);
    }
});

module.exports = router;