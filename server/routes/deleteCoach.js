const express = require('express');
const router = express.Router();
const { User } = require('../models/user.js');
const authorize = require('../middleware/authorize.js');


router.post('/', authorize, async(req, res, next) => {
    const id = req.body.id;
    try {
        const user = await User.findOneAndDelete({ _id: id });
            if (user._id == id) {
                return res.status(200).json({ message: `Coach ${user.name} deleted`});
            } else {
                new Error('Unable to Delete');
            }
    }catch (err) {
        next(err);
    }
    

    


})

module.exports = router