const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const pick = require('lodash/pick')
const jwt = require('jsonwebtoken')
const usersCtlr = {}

usersCtlr.register = async (req, res) => {
    try{
        const body = pick(req.body, ['username', 'email', 'password', 'role'])
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
        res.json(err)
    }
}

usersCtlr.login = async (req, res) => {
    try{
        const body = pick(req.body, ['email', 'password', 'role'])
        const user = await User.findOne({email: body.email})
        if(user) {
            const result = await bcrypt.compare(body.password, user.password)
            if(result) {
                //res.json(user)
                const tokenData = {
                    _id: user._id,
                    role: user.role
                }
                const token = jwt.sign(tokenData, process.env.JWT_SECRET)
                res.json({
                    token: `Bearer ${token}`
                })
            } else {
                res.status(404).json({error: 'invalid email or password'})
            }
        } else {
            res.status(404).json({error: 'invalid email or password'})
        }
    } catch(err) {
        res.json(err)
    }
}

usersCtlr.account = async(req, res) => {
    try{
        const user = await User.findById(req.user._id)
        res.json(pick (user, ['_id', 'username', 'email']))
    } catch(e) {
        res.json(e)
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