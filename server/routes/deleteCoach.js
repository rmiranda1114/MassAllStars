const express = require('express');
const router = express.Router();
const { User } = require('../models/user.js');
const authorize = require('../middleware/authorize.js');


router.post('/', authorize, async(req, res, next) => {
    const id = req.body.id;
    try {
        const player = await User.findOneAndDelete({ _id: id});
            if (player._id == id) {
                return res.status(200).json({ message: 'Coach Deleted'});
            } else {
                throw new Error;
            }
    }catch (err) {
        next(err);
    }
    

    


})

module.exports = router