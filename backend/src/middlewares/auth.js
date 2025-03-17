var jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req, res, next) => {

    try {
        const {cr} = req.cookies;

        if(!cr) {
            return res.status(401).send('not logged in');
        }
    
        const decodedtoken = jwt.verify(cr, process.env.JWT_SECRET);
    
        const {email} = decodedtoken;

        const finduser = await User.findOne({email})

        if(!finduser) {
            return res.status(401).send('user not found');
        }

        req.user = finduser;
        req.role = finduser.role;
        next();

    } catch (error) {
        return res.status(401).send('Invalid token');
    }
}


const isAllowdRole = (roles) => {

    return (req, res, next) => {
        if(!roles.includes(req.role)) {
            return res.status(403).send('Acces denied');
        }
        next();  
    }
} 

module.exports = { userAuth, isAllowdRole }