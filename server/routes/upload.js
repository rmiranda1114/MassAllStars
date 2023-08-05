const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinary.js');
const authorize = require('../middleware/authorize.js');

router.post('/', authorize, async (req, res, next)=> {
    try{
        const fileStr = req.body.data;
        const response = await cloudinary.uploader.upload(fileStr, {
            folder: 'massallstarz'
        })
        res.sendStatus(200);

    } catch (ex) {
        console.log(ex);
        next (ex);
    }
})

module.exports = router;