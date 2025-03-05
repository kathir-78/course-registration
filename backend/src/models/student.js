const mongoose = require('mongoose');
const User = require('./user');


const studentSchema = new mongoose.Schema({

    year: {
        type: String,
        required: true,
        maxlength: 4
    },

    semester: {
        type: Number,
        required: true,
        max: 8
    }
})

const Student = User.discriminator('Student', studentSchema)

module.exports = Student;