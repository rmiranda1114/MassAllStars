const express = require('express');
const { models } = require('mongoose');
const router = express.Router();
const cloudinary = require('../config/cloudinary.js');

router.get('/', async (req, res, next) => {
    try {
        const {resources} = await cloudinary.search.expression('folder:massallstarz')
            .sort_by('public_id', 'desc')
            .execute();
        const publicIds = resources.map((file) => file.public_id);
        res.send(publicIds);
    }
    catch (err) {
        next (err);
    }
})

module.exports = router;