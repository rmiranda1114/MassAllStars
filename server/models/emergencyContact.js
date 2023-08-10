const Joi = require('joi');
const mongoose = require('mongoose');

const emergencyContactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
        },
        relationship: {
            type: String,
            maxlength: 50
        },
        address: {
            street: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            city: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            state: {
                type: String,
                required: true,
                minlength: 2,
                maxlength: 20
            },
            zipcode: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 5,
            }
        },
        phoneMain: {
            type: String,
            required: true,
            minlength: 7,
            maxlength: 20,
            
        },
        phoneAlt: {
            type: String,
            maxlength: 20,
        },
        player: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'players'
            }
        ]
    }
)

const EmergencyContact = mongoose.model('emergencyContact', emergencyContactSchema);
module.exports = EmergencyContact;