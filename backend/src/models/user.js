const mongoose = require('mongoose');
var validator = require('validator');

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error ('invalid email address');
            }
        }
    },

    department: {
        type: String,
        required: true,
        maxlength: 40
    },

    user_id: {
        type: String,
        required: true,
        unique: true
    },

    role: {
        type: String,
        required: true,
        enum: ['admin', 'staff', 'student']
    }
},
{
    timestamps: true
})

const User = mongoose.model('User', userSchema);
module.exports = User;