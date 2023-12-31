const express = require('express');
const router = express.Router();
const { Coach } = require('../models/coach');




router.post('/', async (req, res, next) => {
    //const cookies = req.cookies;
    //if (!cookies?.JWT) return res.sendStatus(204);
    //const refreshtoken = cookies.JWT;
    const id = req.body.userId;

    try {
        const coach = await Coach.findOne({ _id: id });
        if (!coach) {
            res.clearCookie('JWT', { httpOnly: true, sameSite: 'None', secure: true, path: '/refresh_token'});
            return res.status(200).json({ message: "logged out" });
        }

        coach.refreshtoken = '';
        const result = await coach.save();

        res.clearCookie('JWT', { httpOnly: true, sameSite: 'None', secure: true }); //secure: true - for https
        res.sendStatus(204);

    }catch(err) {
        next(err);
    }
})

module.exports = router;