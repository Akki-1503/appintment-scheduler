const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const pick = require('lodash/pick')
const jwt = require('jsonwebtoken')
const usersCtlr = {}

usersCtlr.register = async (req, res) => {
    try{
        const body = pick(req.body, ['username', 'email', 'password', 'role'])
        console.log(req.body, 'body')
        const user = new User(body)
        const userCount = await User.countDocuments()
        if(userCount === 0) {
            user.role = 'admin'
        }
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(user.password, salt)
        user.password = hashedPassword
        const userDoc = await user.save()
        res.json(userDoc)
    } catch(err) {
        res.status(404).json(err.message)
    }
}

usersCtlr.login = async (req, res) => {
    try {
        const body = pick(req.body, ['email', 'password']);
        const user = await User.findOne({ email: body.email });

        if (user) {
            const result = await bcrypt.compare(body.password, user.password);

            if (result) {
                let loggedInDoctor = null;
                if (user.role === 'doctor') {
                    loggedInDoctor = await User.findOne({ email: body.email, role: 'doctor' });
                    if (loggedInDoctor && loggedInDoctor.isVerified === false) {
                        return res.status(403).json({ message: 'Your account is not verified yet. Please contact the admin to verify.' });
                    }
                }

                const tokenData = {
                    _id: user._id,
                    role: user.role
                };
                const token = jwt.sign(tokenData, process.env.JWT_SECRET);
                
                return res.json({
                    token: `Bearer ${token}`,
                    loggedInDoctor // Send doctor details for further frontend handling
                });
            } else {
                return res.status(404).json({ error: 'Invalid email or password' });
            }
        } else {
            return res.status(404).json({ error: 'Invalid email or password' });
        }
    } catch (err) {
        return res.status(500).json(err.message);
    }
};

usersCtlr.account = async(req, res) => {
    try{
        const user = await User.findById(req.user._id)
        res.json(pick (user, ['_id', 'username', 'email', 'role']))
    } catch(e) {
        res.status(404).json(e.message)
    }
    //res.json({messsage: 'user info'})
}

usersCtlr.role = async(req, res) => {
    const role= req.params.role
    //console.log('role',role)
    try{
        
           // const doctors = await User.find()
        const user= await User.find({role})
        res.json(user)
        //console.log('user', user)
        
    } catch(err) {
        res.json(err)
    }
}

module.exports = usersCtlr
