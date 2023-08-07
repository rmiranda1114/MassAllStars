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
            minlength: 5,
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
                maxlength: 2
            },
            zipcode: {
                type: Number,
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
        }
    }
)

const EmergencyContact = mongoose.model('emergencyContact', emergencyContactSchema);
module.exports = EmergencyContact;