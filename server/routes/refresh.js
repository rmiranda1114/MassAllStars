const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
//require('dotenv').config();
const { Coach } = require('../models/coach.js');

//REMEMBER TO REMOVE BODY ********
router.post('/', async (req, res) => {
    const cookies = req.cookies;
   
    if (!cookies?.JWT) return res.status(400).json({ accessToken: ''});
    const token = cookies.JWT;

    let coach = await Coach.findOne({ refreshtoken: token });
    if (!coach) return res.status(403).json({ accessToken: ''});
    
    jwt.verify(token, process.env.jwtRefreshKey, (err, decoded) => {
        if (err || coach.email !== decoded.email) return res.status(403).json({ accessToken: '' });
     });
     
    const accessToken = coach.generateAuthToken();
    const refreshToken = coach.generateRefreshToken();
    
    coach.refreshtoken = refreshToken;
    const result = await coach.save();
    coach.sendRefreshToken(res, refreshToken);
    coach.sendAccessToken(req, res, accessToken);
   
});

module.exports = router;