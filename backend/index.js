require('dotenv').config()
const express = require('express')
const cors = require('cors')
const configureDB = require('./configDb/db')
const usersCtlr = require('./app/controllers/userControllers')
const authenticateUser = require('./app/middlewares/authenticate')
const authorizeUser = require('./app/middlewares/authorization')
const docCtlr = require('./app/controllers/docController')
const slotCtlr = require('./app/controllers/slotController')
const patientCtlr = require('./app/controllers/patientController')
const appointmentCtlr = require('./app/controllers/appointmentController')
const paymentCtlr = require('./app/controllers/paymentController')
const app = express()
const PORT = 3321

configureDB()
app.use(express.json())
app.use(cors())

app.post('/api/users/register', usersCtlr.register)
app.post('/api/users/login', usersCtlr.login)
app.get('/api/users/account',authenticateUser ,usersCtlr.account)
app.get('/api/users/:role', authenticateUser, usersCtlr.role)

app.get('/api/doctors/list', authenticateUser, 
    (req, res, next) => {
        req.permittedRoles = ['admin']
        next()
    }, authorizeUser, docCtlr.list)

// 1.verify doctor
app.put('/api/doctor/verify/:id',authenticateUser, 
(req, res, next) => {
    req.permittedRoles = ['admin']
    next()
}, authorizeUser, docCtlr.verify )

//2.remove doctor
app.delete('/api/doctors/remove/:id', authenticateUser,
    (req, res, next) => {
        req.permittedRoles = ['admin']
        next()
    }, authorizeUser, docCtlr.remove)

app.post('/api/doctors/create', authenticateUser, 
    (req, res, next) => {
        req.permittedRoles = ['admin', 'doctor']
        next()
    }, authorizeUser, docCtlr.create)

app.get('/api/doctors/show/:slug', authenticateUser,
    (req, res, next) => {
        req.permittedRoles = ['admin', 'doctor', 'user']
        next()
    }, authorizeUser, docCtlr.show)

app.put('/api/doctors/:id', authenticateUser,
    (req, res, next) => {
        req.permittedRoles = ['admin', 'doctor']   
        next()
    }, authorizeUser, docCtlr.update)

app.delete('/api/doctors/:id', authenticateUser,
    (req, res, next) => {
        req.permittedRoles = ['admin']
        next()
    }, authorizeUser, docCtlr.destroy)

app.post('/api/patient/add', authenticateUser,
    (req, res, next) => {
        req.permittedRoles = ['user']
        next()
    }, authorizeUser, patientCtlr.create)

app.put('/api/patient/update', authenticateUser, 
    (req, res, next) => {
        req.permittedRoles = ['user']
        next()
    }, authorizeUser, patientCtlr.update)

app.delete('/api/patient/delete', authenticateUser,
    (req, res, next) => {
        req.permittedRoles = ['user']
        next()
    }, authorizeUser, patientCtlr.destroy)

app.post('/api/slots/create', authenticateUser,
    (req,res,next) => {
        req.permittedRoles = ['doctor']
        next()
    }, authorizeUser, slotCtlr.create)

app.get('/api/slots', authenticateUser,
    (req, res, next) => {
        req.permittedRoles = ['doctor', 'user']
        next()
    },authorizeUser, slotCtlr.list)

app.delete('/api/slots/:id', authenticateUser,
    (req, res, next) => {
        req.permittedRoles = ['doctor']
        next()
    },authorizeUser, slotCtlr.destroy)

app.put('/api/slots/:id', authenticateUser,
    (req, res, next) => {
        req.permittedRoles = ['doctor']
        next()
    },authorizeUser, slotCtlr.update)

//app.post('/api/slots/book/:slotId', authenticateUser, slotCtlr.book)

app.post('/api/appointments/create', appointmentCtlr.create)

// app.get('/api/appointments/booked-slots', appointmentCtlr.showBookedSlots)

app.get('/api/appointments/available-slots', authenticateUser,
    (req, res, next) => {
        req.permittedRoles = ['doctor', 'user']
        next()
    },authorizeUser, appointmentCtlr.getAvailableSlots)

app.get('/api/appointments/doctor-slots', authenticateUser,
    (req, res, next) => {
        req.permittedRoles = ['doctor']
        next()
    },authorizeUser, appointmentCtlr.getDoctorSlots)

app.get('/api/appointments/:slug', appointmentCtlr.show)

app.post('/api/appointments/:id', appointmentCtlr.update)

app.patch('/api/appointments/update-status/:id', appointmentCtlr.updateStatus)

// app.put('/appointments/:appointmentId/slots/:slotId/book', appointmentCtlr.bookSlot)

app.post('/api/create-payment', authenticateUser,
    (req, res, next) => {
        req.permittedRoles = ['user']
        next()
    },authorizeUser, paymentCtlr.createPayment)

app.post('/api/confirm-payment', authenticateUser,
    (req, res, next) => {
        req.permittedRoles = ['user']
        next()
    },authorizeUser, paymentCtlr.paymentConfirmation)
    
app.listen(PORT, () => {
    console.log('server running on port', PORT)
})