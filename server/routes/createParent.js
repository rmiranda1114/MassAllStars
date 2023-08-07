const express = require('express');
const router = express.Router();
const { Parent } = require('../models/parent.js');

router.post('/', async (req, res, next)=> {
    try{
        const newForm = req.body.formData;
        let newParent = new Parent({
            name: newForm.parentName,
            address: {
                street: newForm.playerAddress,
                city: newForm.playerCity,
                state: newForm.playerState,
                zipcode: newForm.playerZipcode
            },
            phoneMain: newForm.playerPhone,
            phoneAlt: newForm.playerPhone2,
            acknowlegment: newForm.acknowlegment,
            kids: []
        });

        const savedParent = await newParent.save();
        req.parent = savedParent._id;
        next();
    }
    catch (ex) {
        next (ex);
    }
});

module.exports = router;