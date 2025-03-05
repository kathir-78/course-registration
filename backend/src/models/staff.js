const mongoose = require('mongoose');
const User = require('./user');


const staffSchema = new mongoose.Schema({
})

const Staff = User.discriminator('staff', staffSchema)

module.exports = Staff;