const express = require('express');
const adminRouter = express.Router();
const { userAuth, isAllowdRole} = require('../middlewares/auth');
const { getUser, getUserWithId, createUserStudent, updateUserStudent, removeUserStudent, createUserAdminOrStaff, updateUserAdminOrStaff, removeUserAdminOrStaff } = require('../controllers/admin');

// get all users student or staff or admin
adminRouter.get('/user/:userType', userAuth, isAllowdRole(['admin']), getUser)

adminRouter.get('/user/:userType/:id', userAuth, isAllowdRole(['admin']), getUserWithId)

// student related routes
adminRouter.post('/user/student', userAuth, isAllowdRole(['admin']), createUserStudent);

adminRouter.patch('/user/student/:id', userAuth, isAllowdRole(['admin']), updateUserStudent);

adminRouter.delete('/user/student/:id', userAuth, isAllowdRole(['admin']), removeUserStudent);

// Admin & Staff routes
adminRouter.post('/user/:usertype', userAuth, isAllowdRole(['admin']), createUserAdminOrStaff);

adminRouter.patch('/user/:usertype/:id', userAuth, isAllowdRole(['admin']), updateUserAdminOrStaff);

adminRouter.delete('/user/:usertype/:id', userAuth, isAllowdRole(['admin']), removeUserAdminOrStaff);

module.exports = adminRouter;