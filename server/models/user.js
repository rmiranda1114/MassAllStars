const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
        },
        email: {
            type: String,
            required: true,
            unique: true,
            minlength: 5,
            maxlength: 255
        },
        password: {
                type: String,
                required: true,
                unique: true,
                minlength: 5,
                //Joi validates real length. This length for hash.
                maxlength: 1024
        },
        admin: {
            type: Boolean
        },
        refreshtoken: {
            type: String
        }
    }
);

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id, email: this.email, admin: this.admin }, process.env.jwtPrivateKey, {expiresIn: '15m'});
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ _id: this._id, email: this.email, admin: this.admin }, process.env.jwtRefreshKey, {expiresIn: '1d'});
}

userSchema.methods.sendAccessToken = function (req, res, accessToken) {
    res.header('Authorization', accessToken).status(200).json({ message: 'Login Successful', _id: this._id, user: this.name, admin: this.admin, accessToken: accessToken }) 
}

userSchema.methods.sendRefreshToken = function (res, refreshToken) {
    res.cookie('JWT', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000 //Equals 1 day
    })
}

const User = mongoose.model('users', userSchema);

function validateUser (user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(6).max(16).required()
        
    })

    return  schema.validate(user);
    
}

module.exports.User = User;
module.exports.validate = validateUser;