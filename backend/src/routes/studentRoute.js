const express = require('express');
const {userAuth, isAllowdRole} = require('../middlewares/auth')
const studentRouter = express.Router();

const { getCourses, registereElectiveCourse, registerOpenElectiveCourse, getRegisteredElectiveCourses } = require('../controllers/student');

// get the all courses like core, elective and open-elective 

studentRouter.get('/courses/:coursetype', userAuth, isAllowdRole(['student']), getCourses)


// register the courses for elective and open-elective for particular course

studentRouter.post('/course/register/elective/:id', userAuth, isAllowdRole(['student']), registereElectiveCourse);

studentRouter.post('/course/register/openElective/:id', userAuth, isAllowdRole(['student']), registerOpenElectiveCourse);


// GET registered courses for elective and open-elective /course/registered/:courseType

studentRouter.get('/courses/registered/electives', userAuth, isAllowdRole(['student']), getRegisteredElectiveCourses)


module.exports = studentRouter;