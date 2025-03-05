const express = require('express');
const {CoreCourse, Course, ElectiveCourse, OpenElectiveCourse} = require('../models/courseSchema');
const { validateCourse, validateElectiveCourse, validateEditCourse, validateEditElectiveCourse } = require('../utils/validation');
const { userAuth, isAllowdRole } = require('../middlewares/auth');
const { CourseRegistered } = require('../models/courseRegistered');


const staffRouter = express.Router();


staffRouter.get('/course', async(req, res) => {

    const courses = await Course.find();

    if(!courses) {
        return res.status(404).send("no course found");
    }

    res.status(200).json({message: 'list of courses', courses});

})

staffRouter.get('/course/registered', userAuth,  async(req, res) => {
    
    try {
        const staffDepartment = req.user.department;
        const registeredStudent = await CourseRegistered.find()
        .populate({
            path: 'studentId',
            match: { department: staffDepartment},
            model: 'Student'
        })
        .exec();
        res.status(200).json({registeredStudent});

    } catch (error) {
        res.status(400).send(error.message);
    }

})
// add the courses

staffRouter.post('/course/:coursetype', async(req, res) => {

    try {
        
        const { coursetype }= req.params

        if (coursetype === 'core') {

            validateCourse(req);

            await CoreCourse.create(req.body);

            res.status(201).json(`${ coursetype} added successfully`);
        }
        else if (coursetype === 'elective') {

            validateElectiveCourse(req);

            await ElectiveCourse.create(req.body);

            res.status(201).json(`${ coursetype} added successfully`);
        }
        else if (coursetype === 'openElective') {

            validateElectiveCourse(req);

            await OpenElectiveCourse.create(req.body);

            res.status(201).json(`${ coursetype} added successfully`);
        }
        else 
            throw new Error ('invalid course type');

    } catch (error) {
        res.status(400).send(error.message);
    }
})


// update or patch the course

staffRouter.patch('/course/:coursetype/:id', async(req, res) => {

    try {
        
        const { coursetype, id}= req.params;
        
        if (coursetype === 'core') {

            validateEditCourse(req);

            const updateddata = await CoreCourse.findByIdAndUpdate(id, req.body, {new: true} );

            if(!updateddata ) {
                return res.status(404).send(`${coursetype} not found`);
            }

            res.status(201).json({message: `${ coursetype} added successfully`, data: updateddata});

        }
        else if (coursetype === 'elective') {

            validateEditElectiveCourse(req); 

            const updateddata = await ElectiveCourse.findByIdAndUpdate(id, req.body, {new: true} );

            if(!updateddata ) {
                return res.status(404).send(`${coursetype} not found`);
            }

            res.status(201).json({message: `${ coursetype} added successfully`, data: updateddata});

        }
        else if (coursetype === 'openElective') {

            validateEditElectiveCourse(req); 

            const updateddata = await OpenElectiveCourse.findByIdAndUpdate(id, req.body, {new: true} );

            if(!updateddata ) {
                return res.status(404).send(`${coursetype} not found`);
            }
            
            res.status(201).json({message: `${ coursetype} added successfully`, data: updateddata});

        }
        else 
            throw new Error ('invalid course type');

    } catch (error) {
        res.status(400).send(error.message);
    }
})


// delete course

staffRouter.delete('/course/:coursetype/:id', async(req, res) => {

    try {

        const { coursetype, id}= req.params;
        
        if (coursetype === 'core') {

            const deleteddata = await CoreCourse.findByIdAndDelete(id);

            if(!deleteddata ) {
                return res.status(404).send(`${coursetype} not found`);
            }
            res.status(201).json({message: `${ coursetype} deleted successfully`, data: deleteddata});
        }
        else if (coursetype === 'elective') {

            const deleteddata = await ElectiveCourse.findByIdAndDelete(id);

            if(!deleteddata) {
                return res.status(404).send(`${coursetype} not found`);
            }
            res.status(201).json({message: `${ coursetype} deleted successfully`, data: deleteddata});

        }
        else if (coursetype === 'openElective') {

            const deleteddata = await OpenElectiveCourse.findByIdAndDelete(id);

            if(!deleteddata ) {
                return res.status(404).send(`${coursetype} not found`);
            }

            res.status(201).json({message: `${ coursetype} deleted successfully`, data: deleteddata});

        }
        else 
            throw new Error ('invalid corse type');

    } catch (error) {
        res.status(400).send(error.message);
    }
})


module.exports = staffRouter;