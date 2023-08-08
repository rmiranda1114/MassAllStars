const express = require('express');
const router = express.Router();
const { Parent } = require('../models/parent.js');
const authorize = require('../middleware/authorize.js');

router.post('/', authorize, async (req, res, next)=> {
    try{
        const newForm = req.body.formData;

        const parent = await Parent.findByIdAndUpdate(req.parent);
        parent.name = newForm.parentName || parent.name,
        parent.address.street = newForm.playerAddress || parent.address.street,
        parent.address.city = newForm.playerCity || parent.address.city,
        parent.address.state = newForm.playerState || parent.address.state,
        parent.address.zipcode = newForm.playerZipcode || parent.address.zipcode,
        parent.phoneMain = newForm.playerPhone || parent.phoneMain,
        parent.phoneAlt = newForm.playerPhone2 || parent.phoneAlt

        const updatedPlayer = await parent.save();
        next();
    }
    catch (ex) {
        next (ex);
    }
    
});

module.exports = router;