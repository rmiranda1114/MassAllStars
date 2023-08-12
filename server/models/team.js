const Joi = require('joi');
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50
        },
        headCoach: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'coach'
        },
        asstCoach: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'coach'
        },
        players: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'players'
            }
        ]
    }
);

const Team = mongoose.model('team', teamSchema);
module.exports.Team = Team;