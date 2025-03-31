const express = require('express');
const authRouter = express.Router();
const { OAuth2Client } = require('google-auth-library');
var jwt = require('jsonwebtoken');
const Student = require('../models/student');
const Admin = require('../models/admin');
const Staff = require('../models/staff');
const { userAuth } = require('../middlewares/auth');

// here the both the google-login and the normal login takes place
authRouter.post('/auth/login/:loginType', async(req, res) => {

    let email;
    const loginType = req.params.loginType

    try {
        if(loginType === "google-login") {
            const { googleCredential } = req.body;
            
            const client = new OAuth2Client(process.env.CLIENT_ID);
            
            const ticket = await client.verifyIdToken({
                idToken: googleCredential,
                audience: process.env.CLIENT_ID,
            });
            
            const payload = ticket.getPayload();
            if (!payload) {
                return res.status(401).json({ message: 'Invalid Google Token' });
            }
            // console.log(payload);
            email = payload.email;
        }
        else {
             email = req.body.email;
        }
        

        let user;

        user = await Student.findOne({email})

        if(!user) {
            user = await Staff.findOne({email})
        }

        if(!user) {
            user = await Admin.findOne({email})
        }

        if (!user) {
            return res.status(403).json({ message: 'Unauthorized: User not found' });
        }
        
        var token = jwt.sign({ firstName: user.firstName, email: user.email, role: user.role}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.status(200)
        .clearCookie('cr')  // clear the existing cookie that is stored in the client side (browser)
        .cookie('cr', token, 
            {httpOnly: true,  // Prevent JavaScript access
            secure: false,   
            sameSite: 'Lax', expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }).json({ message: 'Login successful'});
    } catch (error) {
        res.status(500).send(error.message);
    }
})


authRouter.post('/auth/logout', async (req, res) => {
    try {
        res.status(200).clearCookie('cr').json({message: 'Logout Successful'});
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// get the user details like firstname, lastname and role for the loading to the frontend based UI on the token
authRouter.get('/auth/user', userAuth, async (req, res) => {
    try {
        const {firstName, lastName, role} = req.user;
        res.status(200).json({firstName, lastName, role})

    } catch (error) {
        res.status(401).send(error.message);
    }
})


module.exports = authRouter