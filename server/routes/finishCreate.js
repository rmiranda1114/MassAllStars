const express = require('express');
const router = express.Router();
const { Parent } = require('../models/parent.js');

router.post('/', async (req, res, next)=> {
    try{
        const id = req.body.parent;
        const kids = req.body.kids;

        const parent = await Parent.findById(id);

        parent.kids = kids;

        await parent.save();

        res.status(201).json({ message: 'Registration Complete' })
    }
    catch (ex) {
        next (ex);
    }
});

module.exports = router;