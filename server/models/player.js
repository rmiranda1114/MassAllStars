const Joi = require('joi');
const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        dob: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        grade: {
            type: String
        },
        school: {
            type: String
        },
        sport: {
            type: String
        },
        uniformSize: {
            type: String
        },
        prefNum : {
            num1: {
            type: Number
            },
            num2: {
                type: Number
            },
            num3: {
                type: Number
            }
        },
        team: {
            type: String
        },
        playerNumber: {
            type: Number
        },
        medicalCondition: {
            type: String
        },
        parent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'parent'
        },
        teamId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'team'
        },
        emergency: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'emergencyContact'
        }]
    }
);

const Player = mongoose.model('players', playerSchema);

const validateRegistration = (player) => {
    const schema = Joi.object({
        id: Joi.string(),
        playerName: Joi.string(),
        playerDOB: Joi.date(),
        playerAge: Joi.number().min(5).max(17),
        playerGrade: Joi.string().max(25),
        parentName: Joi.string().min(5).max(50).required(),
        playerSchool: Joi.string().max(100),
        playerAddress: Joi.string().min(5).max(100).required(),
        playerCity: Joi.string().min(5).max(50).required(),
        playerState: Joi.string().min(2).max(50).required(),
        playerZipcode: Joi.number().min(1).max(99999).required(),
        playerPhone: Joi.string().min(5).max(50).required(),
        playerPhone2: Joi.string().min(0).max(50),
        emergencyName1: Joi.string().min(5).max(50).required(),
        emergencyRelationship1: Joi.string().max(50),
        emergencyAddress1: Joi.string().min(5).max(100).required(),
        emergencyCity1: Joi.string().min(5).max(50).required(),
        emergencyState1: Joi.string().min(2).max(50).required(),
        emergencyZipcode1: Joi.number().min(5).max(99999).required(),    
        emergencyHomephone1: Joi.string().min(0).max(50),
        emergencyCellphone1: Joi.string().min(0).max(50),
        emergencyName2: Joi.string().min(0).max(50),
        emergencyRelationship2: Joi.string().min(0).max(50),
        emergencyAddress2: Joi.string().min(0).max(100),
        emergencyCity2: Joi.string().min(0).max(50),
        emergencyState2: Joi.string().min(0).max(50),
        emergencyZipcode2: Joi.string().min(0).max(10),
        emergencyHomephone2: Joi.string().min(0).max(50),
        emergencyCellphone2: Joi.string().min(0).max(50),
        sport: Joi.required(),
        uniformSize: Joi.required(),
        uniformNumber1: Joi.number().min(0).max(99),
        uniformNumber2: Joi.number().min(0).max(99),
        uniformNumber3: Joi.number().min(0).max(99),
        playerNumber: Joi.number().min(0).max(99),
        team: Joi.string().max(25),
        playerMedical: Joi.string().min(0).max(100),
        acknowlegment: Joi.boolean()
    }).options({ abortEarly: false });

    return schema.validate(player);
};

module.exports.Player = Player;
module.exports.validate = validateRegistration;