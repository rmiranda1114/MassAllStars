const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const EmergencyContact = require('../models/emergencyContact');
const authorize = require('../middleware/authorize.js');

router.post('/', authorize, async (req, res, next) => {
    try{
        const emerId = req.body.emergencyId;
        const emerArr = [];

        for (let i in emerId) {
            let emer = await EmergencyContact.findById(emerId[i]);
            emerArr.push(emer);
        }

        res.status(200).send(emerArr);
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;