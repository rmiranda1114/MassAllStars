const Joi = require('joi');
const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
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
        },
        acknowlegment: {
            type: Boolean
        },
        kids: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'players'
            }
        ]
    }
);

const Parent = mongoose.model('parent', parentSchema);
module.exports.Parent = Parent;