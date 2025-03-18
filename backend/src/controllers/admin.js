const Student = require('../models/student');
const Staff = require('../models/staff');
const Admin = require('../models/admin');
const { validateEditStudent, validateCreateUser, validateEdit } = require('../utils/validation');


const getUser = async(req, res) => {
    try {
        const { userType } = req.params

        if(userType === 'staff') {
            const staff = await Staff.find({role: userType});
            res.status(200).json(staff);
        }

        else if (userType === 'student') {
            const student = await Student.find({role: userType});
            res.status(200).json(student);
        }

        else if (userType === 'admin') {
            const student = await Admin.find({role: userType});
            res.status(200).json(student);
        }

        else {
            res.status(404).send('invalid user');
        }

    } catch (error) {
        res.status(400).send('user not found');
    }
}

const getUserWithId = async(req, res) => {
    try {
        const { userType, id } = req.params

        if(userType === 'staff') {
            const staff = await Staff.findById(id);
            res.status(200).json(staff);
        }

        else if (userType === 'student') {
            const student = await Student.findById(id);
            const {firstName, lastName, email, department, user_id, year, semester} = student;
            res.status(200).json({firstName, lastName, email, department, user_id, year, semester});
        }

        else if (userType === 'admin') {
            const student = await Admin.findById(id);
            res.status(200).json(student);
        }

        else {
            res.status(404).send('invalid user');
        }

    } catch (error) {
        res.status(500).send('user not found');

    }
}

const createUserStudent = async (req, res) => {
    try {
        validateCreateUser(req);

        const { firstName, lastName, email, department, user_id, role, year, semester } = req.body;

        const newStudent = new Student({ firstName, lastName, email, department, user_id, role, year, semester });

        await newStudent.save();

        res.status(201).json({ message: 'Student created successfully', data: newStudent });

    } catch (error) {

        res.status(400).send(error.message);
    }
}

const updateUserStudent = async (req, res) => {
    try {

        validateEditStudent(req);
        const { id } = req.params;

        const updatedStudent = await Student.findByIdAndUpdate({_id:id}, req.body, { new: true, });

        if (!updatedStudent) return res.status(404).json({ message: 'Student not found' });

        res.status(200).json({ message: 'Student updated', data: updatedStudent });

    } catch (error) {
        res.status(400).send(error.message);
    }
}

const removeUserStudent = async (req, res) => { 
    try {
        const { id } = req.params;

        const student = await Student.findByIdAndDelete({_id:id});

        if (!student) return res.status(404).json({ message: 'Student not found' });

        res.status(200).json({ message: 'Student deleted' });

    } catch (error) {

        res.status(400).send(error.message);
    }
}

const createUserAdminOrStaff = async (req, res) => {
    try {
        validateCreateUser(req);
        const { usertype } = req.params;
        const { firstName, lastName, email, department, user_id, role } = req.body;

        let user;
        if (usertype === 'staff') {
            user = new Staff({ firstName, lastName, email, department, user_id, role });

        } else if (usertype === 'admin') {
            user = new Admin({ firstName, lastName, email, department, user_id, role });
        
        } else {
            return res.status(400).json({ message: 'Invalid user type' });
        }

        await user.save();

        res.status(201).json({ message: `${usertype} created`, data: user }); 

    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateUserAdminOrStaff = async (req, res) => {
    try {
        const { usertype, id } = req.params;
        let Model;

        if (usertype === 'staff') {
            validateEdit(req);
            Model = Staff;

        } else if (usertype === 'admin') {
            validateEdit(req);
            Model = Admin;

        } else {
            return res.status(400).json({ message: 'Invalid user type' });
        }

        const updatedUser = await Model.findByIdAndUpdate({_id:id}, req.body, { new: true });

        if (!updatedUser) return res.status(404).json({ message: `${usertype} not found` });

        res.status(200).json({ message: `${usertype} updated`, data: updatedUser });

    } catch (error) {

        res.status(400).send(error.message);
    }
}

const removeUserAdminOrStaff = async (req, res) => {
    try {
        const { usertype, id } = req.params;
        let Model;

        if (usertype === 'staff') Model = Staff;

        else if (usertype === 'admin') Model = Admin;

        else return res.status(400).json({ message: 'Invalid user type' });

        const user = await Model.findByIdAndDelete({_id:id});

        if (!user) return res.status(404).json({ message: `${usertype} not found` });

        res.status(200).json({ message: `${usertype} deleted` });

    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getUser, getUserWithId, createUserStudent, updateUserStudent, removeUserStudent, createUserAdminOrStaff, updateUserAdminOrStaff, removeUserAdminOrStaff
}