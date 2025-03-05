const mongoose = require('mongoose');
const User = require('./user');


const adminSchema = new mongoose.Schema({

    userAdded: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }
})

const Admin = User.discriminator('Admin', adminSchema)

module.exports = Admin;