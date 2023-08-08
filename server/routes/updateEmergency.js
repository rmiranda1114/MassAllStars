const express = require('express');
const router = express.Router();
const EmergencyContact = require('../models/emergencyContact');
const authorize = require('../middleware/authorize.js');

router.post('/', authorize, async (req, res, next)=> {
    try{
        const newForm = req.body.formData;

        const emergencyContact = await EmergencyContact.findByIdAndUpdate(req.emergencyContact);
        emergencyContact.name = newForm.emergencyName1 || emergencyContact.name,
        emergencyContact.relationship = newForm.emergencyRelationship1 || emergencyContact.relationship,
        emergencyContact.address.street = newForm.emergencyAddress1 || emergencyContact.address.street,
        emergencyContact.address.city = newForm.emergencyCity1 || emergencyContact.address.city,
        emergencyContact.address.state = newForm.emergencyState1 || emergencyContact.address.state,
        emergencyContact.address.zipcode = newForm.emergencyZipcode1 || emergencyContact.address.zipcode,
        emergencyContact.phoneMain = newForm.emergencyHomephone1 || emergencyContact.phoneMain,
        emergencyContact.phoneAlt = newForm.emergencyCellphone1 || emergencyContact.phoneAlt
       
        const updatedEmergencyContact = await emergencyContact.save();
    
        res.status(201).json({ message: 'Player has been updated' })
    }
    catch (ex) {
        next (ex);
    }
    
});

module.exports = router;