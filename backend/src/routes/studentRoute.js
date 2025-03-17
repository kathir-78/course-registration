const express = require('express');
const {userAuth, isAllowdRole} = require('../middlewares/auth')
const studentRouter = express.Router();
const { CoreCourse, ElectiveCourse, OpenElectiveCourse} = require('../models/courseSchema');
const { CourseRegistered } = require('../models/courseRegistered');

// get the all courses like core, elective and open-elective 

studentRouter.get('/courses/:coursetype', userAuth, isAllowdRole(['student']), async (req, res) => {

    const {coursetype} = req.params;
    try {

        const { department, semester, _id: studentId } = req.user
        let registeredCourses = await CourseRegistered.find({ studentId }).select('courseId');
        registeredCourses = registeredCourses.map(course => course.courseId);
        
        if(coursetype === 'core') {

            const findCourse = await CoreCourse.find({department: department, semester})

            if(findCourse.length === 0) {
                return res.status(400).send('course not found');
            }
            res.status(200).json(findCourse);
        }

        else if(coursetype === 'elective') {

            const findCourse = await ElectiveCourse.find({
                $or: [
                    { department, semester },
                    { eligibleDepartments:{ $in: [department] }, semester}
                ],
                _id: { $nin: registeredCourses }
            })
            res.status(200).json(findCourse);
        }

        else if (coursetype === 'openElective') {
            const findCourse = await OpenElectiveCourse.find({
                $and: [
                    { department: { $ne: department }, semester },
                    // { department:  department, semester: semester },
                    { eligibleDepartments: { $in: [department] }, semester }
                ],
                _id: { $nin: registeredCourses }
            })
            res.status(200).json(findCourse);
        }

        else {
            throw new Error ('invalid api');
        }

    } catch (error) {

        res.status(400).send(error.message);
    }
})


// register the courses for elective and open-elective for particular course

studentRouter.post('/course/register/elective/:id', userAuth, isAllowdRole(['student']), async (req, res) => {
    try {
        const { id } = req.params;
        const { _id, department} = req.user;

        const course = await ElectiveCourse.findOne({_id: id});

        if (!course) return res.status(404).json({ error: 'Course not found' });

        if(!course.department.includes(department)) {
            return res.status(400).send('not eligible for this course');
        }

        const existingRegistration = await CourseRegistered.findOne({
            courseId: course._id,
            studentId: _id
        });

        if (existingRegistration) {
            return res.status(409).json({ error: 'Already registered for this course' });
        }

        const newRegistration = new CourseRegistered({
            courseId: course._id,
            studentId: _id
        });

        await newRegistration.save();

        res.status(201).json(newRegistration);

    } catch (error) {
 
        if (error.code === 11000 && error.message.includes('unique_registration')) {
            return res.status(409).json({ error: 'Already registered for this course' });
        }
        res.status(500).send(error.message);
    }
});

studentRouter.post('/course/register/openElective/:id', userAuth, isAllowdRole(['student']), async (req, res) => {
    try {
        const { id } = req.params;
        const { _id, department} = req.user;

        const course = await OpenElectiveCourse.findOne({_id: id});

        if (!course) return res.status(404).json({ error: 'Course not found' });

        if(!course.eligibleDepartments.includes(department)) {
            return res.status(400).send('not eligible for this course');
        }
        
        const existingRegistration = await CourseRegistered.findOne({
            studentId: _id,
            courseId: course._id
        });

        if (existingRegistration) {
            return res.status(409).json({ error: 'Already registered for this course' });
        }

        const newRegistration = new CourseRegistered({
            courseId: course._id,
            studentId: _id
        });

        await newRegistration.save();

        res.status(201).json(newRegistration);

    } catch (error) {
 
        if (error.code === 11000 && error.message.includes('unique_registration')) {
            return res.status(409).json({ error: 'Already registered for this course' });
        }
        res.status(500).send(error.message);
    }
});


// GET registered courses for elective and open-elective /course/registered/:courseType

studentRouter.get('/courses/registered/electives', userAuth, isAllowdRole(['student']), async(req, res)=> {

    try {

        const { _id } = req.user;
    
        const electiveRegCourse = await CourseRegistered.find({studentId: _id})
        .populate('courseId', ["courseCode", "courseName", "description"]);

        const courseId = electiveRegCourse.map(reg => reg.courseId);
    
        res.status(201).json(courseId);
        
    } catch (error) {
        res.status(400).send(error.message);
        console.log(error);
    }

})


module.exports = studentRouter;