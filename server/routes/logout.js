const express = require('express');
const router = express.Router();
const { User } = require('../models/user');




router.post('/', async (req, res, next) => {
    //const cookies = req.cookies;
    //if (!cookies?.JWT) return res.sendStatus(204);
    //const refreshtoken = cookies.JWT;
    const refreshtoken = req.body.refresh;

    try {
        const user = await User.findOne({ refreshtoken: refreshtoken });
        if (!user) {
            res.clearCookie('JWT', { httpOnly: true, sameSite: 'None', secure: true, path: '/refresh_token'});
            return res.status(200).json({ message: "logged out" });
        }

        user.refreshtoken = '';
        const result = await user.save();

        res.clearCookie('JWT', { httpOnly: true, sameSite: 'None', secure: true }); //secure: true - for https
        res.sendStatus(204);

    }catch(err) {
        next(err);
    }
})

module.exports = router;