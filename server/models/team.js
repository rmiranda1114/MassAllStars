const Joi = require('joi');
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            minlength: 2,
            maxlength: 50
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