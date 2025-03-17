const validator = require('validator');

const validateCreateUser = (req) => {
        const { firstName, lastName, email,  department, user_id, role} = req.body;
        const allowedRoles = ['admin', 'staff', 'student'];
        if (!firstName || !lastName) {
          throw new Error("Name is not valid!");
        } else if (!validator.isEmail(email)) {
          throw new Error("Email is not valid!");
        } else if (!department) {
          throw new Error("Department is not valid!");
        } else if (!user_id) {
            throw new Error("user_id is not valid!");
        } else if (!allowedRoles.includes(role)) {
            throw new Error("Role is not valid!");
        }
}
      
const validateEditStudent = (req) => {
    const valideFields = [
        'firstName',
        'lastName',
        'department',
        'role',
        'year',
        'semester'
    ];
    const requestFields = Object.keys(req.body);
    const isValid = requestFields.every(field => valideFields.includes(field));
    if (!isValid) {
        throw new Error('invalid data');
    }
}

const validateEdit = (req) => {
    const valideFields = [
        'firstName',
        'lastName',
        'department',
        'role',
    ];
    
    const requestFields = Object.keys(req.body);
    const isValid = requestFields.every(field => valideFields.includes(field));
    if (!isValid) {
        throw new Error('invalid data');
    }
}

const validateCourse = (req) => {
    const valideCourseFields = [
        'courseCode',
        'courseName',
        'description',
        'department',
        'semester'
    ]

    const requestFields = Object.keys(req.body);
    const isValid = requestFields.every(field => valideCourseFields.includes(field));
    if(!isValid) {
        throw new Error('invalid data');
    }
}

const validateEditCourse = (req) => {
    const valideCourseFields = [
        'courseName',
        'description',
        'department',
        'semester'
    ]

    const requestFields = Object.keys(req.body);
    const isValid = requestFields.every(field => valideCourseFields.includes(field));
    if(!isValid) {
        throw new Error('invalid data');
    }
}

const validateElectiveCourse = (req) => {
    const valideElectiveCourseFields = [
        'courseCode',
        'courseName',
        'description',
        'department',
        'semester',
        'eligibleDepartments'
    ]

    const requestFields = Object.keys(req.body);
    const isValid = requestFields.every(field => valideElectiveCourseFields.includes(field));
    if(!isValid) {
        throw new Error('invalid data');
    }
}

const validateEditElectiveCourse = (req) => {
    const valideElectiveCourseFields = [
        'courseName',
        'description',
        'department',
        'semester',
        'eligibleDepartments'
    ]

    const requestFields = Object.keys(req.body);
    const isValid = requestFields.every(field => valideElectiveCourseFields.includes(field));
    if(!isValid) {
        throw new Error('invalid data');
    }
}

module.exports = {
    validateEditStudent, validateCreateUser, validateEdit, validateCourse, validateElectiveCourse, validateEditCourse, validateEditElectiveCourse
}