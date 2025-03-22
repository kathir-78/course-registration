const {CoreCourse, Course, ElectiveCourse, OpenElectiveCourse } = require('../models/courseSchema');
const { CourseRegistered } = require('../models/courseRegistered');
const Student = require('../models/student');
const { validateCourse, validateElectiveCourse, validateEditCourse, validateEditElectiveCourse } = require('../utils/validation');


const getCourses = async(req, res) => {

    const {department} = req.user; 
    try{
    const courses = await Course.find({department}, '_id courseCode courseName description department semester');

    res.status(200).json({message: 'list of courses', courses});

    }
    catch {
        res.status(400).send(error.message);
    }

}

const getSpecificCourse =  async(req, res) => {

    const {courseType} = req.params;

    try {
        const courses = await Course.find({__t:courseType});

        if(courses.length == 0) {
            return res.status(404).send(` ${courseType} course not found`);
        }
    
        res.status(200).json({message: 'list of courses', courses});

    } catch (error) {
        res.status(400).send(error.message);
    }

}

const getSpecificCourseWithUnique = async(req, res) => {

    try {

        const {courseType, id} = req.params;

        if(courseType === 'core') {
            const corecourse = await CoreCourse.findById(id);
            const {courseCode, courseName, description, department, semester} = corecourse
            return res.status(200).json({courseCode, courseName, description, department, semester});
        }
        else if (courseType === 'elective') {
            const electivecourse = await ElectiveCourse.findById(id);
            const {courseCode, courseName, description, department, semester, eligibleDepartments} = electivecourse
            return res.status(200).json({courseCode, courseName, description, department, semester, eligibleDepartments});
        }
        else if (courseType === 'openElective') {
            const openelectivecourse = await OpenElectiveCourse.findById(id);
            const {courseCode, courseName, description, department, semester, eligibleDepartments} = openelectivecourse
            return res.status(200).json({courseCode, courseName, description, department, semester, eligibleDepartments});
        }
        else 
            throw new Error ('invalid course type');
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getCourseRegisteredStudent = async (req, res) => {
    try {
        const staffDepartment = req.user.department;
        const semester = parseInt(req.query.semester);

        // Get students in the staff's department and semester
        const students = await Student.find({
            department: staffDepartment,
            semester: semester
        }).select('_id');

        if (students.length === 0) {
            return res.status(200).json([]);
        }

        // Extract student IDs
        const studentIds = students.map(student => student._id);

        // Get registrations for these students
        const registrations = await CourseRegistered.find({
            studentId: { $in: studentIds }
        })
        .populate({
            path: 'studentId',
            select: 'firstName lastName user_id email semester department'
        })
        .populate({
            path: 'courseId',
            select: 'courseCode courseName description'
        });

        // Group by student
        const studentCourseMap = {};

        registrations.forEach(registration => {
            const student = registration.studentId;
            const course = registration.courseId;

            if (!studentCourseMap[student.user_id]) {
                studentCourseMap[student.user_id] = {
                    studentDetails: {
                        user_id: student.user_id,
                        firstName: student.firstName,
                        lastName: student.lastName,
                        email: student.email,
                        semester: student.semester,
                        department: student.department
                    },
                    registeredCourses: []
                };
            }

            studentCourseMap[student.user_id].registeredCourses.push({
                courseCode: course.courseCode,
                courseName: course.courseName,
                description: course.description
            });
        });

        // Convert object to an array of student-course mappings
        const result = Object.values(studentCourseMap);
        res.status(200).json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const createCourse = async(req, res) => {

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
}

const updateCourse =  async(req, res) => {

    try {
        
        const { coursetype, id} = req.params;
        
        if (coursetype === 'core') {

            validateEditCourse(req);

            const updateddata = await CoreCourse.findByIdAndUpdate(id, req.body, {new: true} );

            if(!updateddata ) {
                return res.status(404).send(`${coursetype} not found`);
            }

            res.status(201).json({message: `${ coursetype} updated successfully`, data: updateddata});

        }
        
        else if (coursetype === 'elective') {

            validateEditElectiveCourse(req); 

            const updateddata = await ElectiveCourse.findByIdAndUpdate(id, req.body, {new: true} );

            if(!updateddata ) {
                return res.status(404).send(`${coursetype} not found`);
            }

            res.status(201).json({message: `${ coursetype} updated successfully`, data: updateddata});

        }
        else if (coursetype === 'openElective') {

            validateEditElectiveCourse(req); 

            const updateddata = await OpenElectiveCourse.findByIdAndUpdate(id, req.body, {new: true} );

            if(!updateddata ) {
                return res.status(404).send(`${coursetype} not found`);
            }
            
            res.status(201).json({message: `${ coursetype} updated successfully`, data: updateddata});

        }
        else 
            throw new Error ('invalid course type');

    } catch (error) {
        res.status(400).send(error.message);
    }
}

const removeCourse = async(req, res) => {

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
}

module.exports = { getCourses, getSpecificCourse, getSpecificCourseWithUnique, getCourseRegisteredStudent, createCourse, updateCourse, removeCourse }