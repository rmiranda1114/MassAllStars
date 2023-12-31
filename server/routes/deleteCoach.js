const express = require('express');
const router = express.Router();
const { Coach } = require('../models/coach.js');
const authorize = require('../middleware/authorize.js');


router.post('/', authorize, async(req, res, next) => {
    const id = req.body.id;
    try {
        const coach = await Coach.findOneAndDelete({ _id: id });
            if (coach._id == id) {
                return res.status(200).json({ message: `Coach ${coach.name} has been deleted`});
            } else {
                new Error('Unable to Delete');
            }
    }catch (err) {
        next(err);
    }
})

module.exports = router