const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Parent } = require('../models/parent.js');
const authorize = require('../middleware/authorize.js');

router.post('/', authorize, async (req, res, next) => {

    try{
        let parent = await Parent.findById(req.body.parentId);
        res.status(200).send(parent);
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;