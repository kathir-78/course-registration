const mongoose = require('mongoose');

const courseRegisteredSchema = new mongoose.Schema({

    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },

    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },

    registrationDate: {
        type: Date,
        default: Date.now
    }
},
{
    timestamps: true
})

courseRegisteredSchema.index({ studentId: 1, courseId: 1 }, { unique: true, name: 'unique_registration' });

const CourseRegistered = mongoose.model('CourseRegister', courseRegisteredSchema);

module.exports = { CourseRegistered };