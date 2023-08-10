const express = require('express');
const router = express.Router();
const { Parent } = require('../models/parent.js');

router.post('/', async (req, res, next)=> {
    try{
        const newForm = req.body.formData;
        let newParent = new Parent({
            name: newForm.name,
            address: {
                street: newForm.street,
                city: newForm.city,
                state: newForm.state,
                zipcode: newForm.zipcode
            },
            phoneMain: newForm.phoneMain,
            phoneAlt: newForm.phoneAlt,
            acknowledgment: newForm.acknowledgment,
            kids: []
        });

        const savedParent = await newParent.save();
        res.status(201).send(savedParent._id)
    }
    catch (ex) {
        next (ex);
    }
});

module.exports = router;