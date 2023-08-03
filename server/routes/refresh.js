const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../models/user.js');

//REMEMBER TO REMOVE BODY ********
router.post('/', async (req, res) => {
   
    //const cookies = req.cookies;
    const token = req.body.refresh;
    
    //if (!cookies?.JWT) return res.status(400).json({ accessToken: ''});
    //const token = cookies.JWT;

    let user = await User.findOne({ refreshtoken: token });
    if (!user) return res.status(403).json({ accessToken: ''});
    
    jwt.verify(token, process.env.jwtRefreshKey, (err, decoded) => {
        if (err || user.email !== decoded.email) return res.status(403).json({ accessToken: '' });
     });
     
    const accessToken = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();
    
    user.refreshtoken = refreshToken;
    const result = await user.save();
    user.sendRefreshToken(res, refreshToken);
    user.sendAccessToken(req, res, accessToken, refreshToken);
   

});

module.exports = router;