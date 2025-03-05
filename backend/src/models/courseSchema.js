const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseCode: {
        type: String,
        required: true,
        maxlength: 7,
        minlength: 5,
        unique: true
    },
    courseName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true,
        maxlength: 4,
        minlength: 2 
    },
    semester: {
        type: String,
        required: true
    }
}, 
{
    timestamps: true
});



const Course = mongoose.model('Course', courseSchema);

const CoreCourse = Course.discriminator('Core', new mongoose.Schema({}));

const ElectiveCourse = Course.discriminator('Elective', new mongoose.Schema({
    eligibleDepartment: {
        set: v => v.map(dep => dep.toUpperCase()),
        type: [String],
        required: true
    }
}));

const OpenElectiveCourse = Course.discriminator('OpenElective', new mongoose.Schema({
    eligibleDepartment: {
        set: v => v.map(dep => dep.toUpperCase()),
        type: [String],
        required: true
    }
}));

module.exports = {
    Course,
    CoreCourse,
    ElectiveCourse,
    OpenElectiveCourse,
};