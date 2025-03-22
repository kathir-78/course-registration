const express = require('express');
const { userAuth, isAllowdRole } = require('../middlewares/auth');
const { getSpecificCourse, getSpecificCourseWithUnique, getCourseRegisteredStudent, createCourse, updateCourse, removeCourse, getCourses } = require('../controllers/staff');


const staffRouter = express.Router();

// get all course like core, elective and open elective
staffRouter.get('/course', userAuth, isAllowdRole(['staff']), getCourses)

// get get only specific courses
staffRouter.get('/course/:courseType', userAuth, isAllowdRole(['staff']), getSpecificCourse)

// get course with specific course that is unique course 
staffRouter.get('/course/:courseType/:id', userAuth, isAllowdRole(['staff']), getSpecificCourseWithUnique)

// get the registered students for all courses
staffRouter.get('/courses/registered', userAuth, isAllowdRole(['staff']), getCourseRegisteredStudent);


// add the courses depends on coursetype
staffRouter.post('/course/:coursetype', userAuth, isAllowdRole(['staff']), createCourse)

// update or patch the course 
staffRouter.patch('/course/:coursetype/:id', userAuth, isAllowdRole(['staff']), updateCourse)

// delete course
staffRouter.delete('/course/:coursetype/:id', userAuth, isAllowdRole(['staff']), removeCourse)


module.exports = staffRouter;