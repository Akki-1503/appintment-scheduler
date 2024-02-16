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

const multer = require('multer')
const upload = multer()
const PORT = 3321

configureDB()
app.use(express.json())
app.use(cors())

app.post('/api/users/register', usersCtlr.register)
app.post('/api/users/login', usersCtlr.login)
app.get('/api/users/account',authenticateUser ,usersCtlr.account)
app.get('/api/users/:role', authenticateUser, usersCtlr.role)
app.post('/api/users/reset-password', usersCtlr.resetPassword)

// app.post('/api/doctor/login', authenticateUser, docCtlr.login)

app.get('/api/doctors/list', authenticateUser, 
    (req, res, next) => {
        req.permittedRoles = ['admin']
        next()
    }, authorizeUser, docCtlr.list)

app.get('/api/doctors/patient', authenticateUser,
    (req, res, next)=> {
        req.permittedRoles = ['admin', 'patient']
        next()
    }, authorizeUser, docCtlr.doclist)

// 1.verify doctor
app.put('/api/doctor/verify/:id',authenticateUser, 
    (req, res, next) => {
        req.permittedRoles = ['admin']
        next()
    }, authorizeUser, docCtlr.verify )

app.get('api/doctor/verificationStatus/:id',authenticateUser, docCtlr.verificationStatus)

//2.remove doctor
app.delete('/api/doctors/remove/:id', authenticateUser,
    (req, res, next) => {
        req.permittedRoles = ['admin']
        next()
    }, authorizeUser, docCtlr.remove)

app.post('/api/doctors/create', authenticateUser, upload.single('avatar'), 
    (req, res, next) => { console.log(req.body, 'req body', req.file, 'req file')
        req.permittedRoles = ['admin', 'doctor']
        next()
    }, authorizeUser, docCtlr.create)

app.get('/api/doctors/show/:id', authenticateUser,
    (req, res, next) => {
        req.permittedRoles = ['admin', 'doctor', 'patient']
        next()
    }, authorizeUser, docCtlr.show)

app.put('/api/doctors/:doctorId', authenticateUser, upload.single('avatar'),
    (req, res, next) => {
        req.permittedRoles = ['admin', 'doctor']   
        next()
    }, authorizeUser, docCtlr.update)

app.delete('/api/doctors/:id', authenticateUser,
    (req, res, next) => {
        req.permittedRoles = ['admin']
        next()
    }, authorizeUser, docCtlr.destroy)

app.get('/api/doctors/list-patients/:doctorId', authenticateUser,
    (req, res, next) => {
        req.permittedRoles = ['doctor']
        next()
    }, authorizeUser, docCtlr.listPatients)

app.post('/api/patient/add', authenticateUser,
    (req, res, next) => {
        req.permittedRoles = ['patient']
        next()
    }, authorizeUser, patientCtlr.create)

app.put('/api/patient/update', authenticateUser, 
    (req, res, next) => {
        req.permittedRoles = ['patient']
        next()
    }, authorizeUser, patientCtlr.update)

app.get('/api/bookings/:patientId', authenticateUser,
    (req, res, next) => {
        req.permittedRoles = ['patient']
        next()
    }, authorizeUser, patientCtlr.listBookings)

app.delete('/api/patient/delete', authenticateUser,
    (req, res, next) => {
        req.permittedRoles = ['patient']
        next()
    }, authorizeUser, patientCtlr.destroy)

app.post('/api/slots/create', authenticateUser,
    (req,res,next) => {
        req.permittedRoles = ['doctor']
        next()
    }, authorizeUser, slotCtlr.create)

app.get('/api/slots/:userId', authenticateUser,
    (req, res, next) => {
        req.permittedRoles = ['doctor', 'patient']
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

app.post('/api/slots/book/:slotId', authenticateUser,
    (req, res, next)=> {
        req.permittedRoles = ['patient']
        next()
    },authorizeUser, slotCtlr.bookSlot)

app.post('/api/appointments/create', appointmentCtlr.create)

// app.get('/api/appointments/booked-slots', appointmentCtlr.showBookedSlots)

app.get('/api/appointments/available-slots', authenticateUser,
    (req, res, next) => {
        req.permittedRoles = ['doctor', 'patient']
        next()
    },authorizeUser, appointmentCtlr.getAvailableSlots)

app.get('/api/appointments/doctor-slots', authenticateUser,
    (req, res, next) => {
        req.permittedRoles = ['doctor']
        next()
    },authorizeUser, appointmentCtlr.getDoctorSlots)

app.post('/api/appointments/:id', appointmentCtlr.show)

app.post('/api/appointments/email/:id', authenticateUser,
    (req, res, next) => {
        req.permittedRoles = ['doctor']
        next()
    },authorizeUser, appointmentCtlr.update)

app.get('/api/appointments/confirm/:userId', authenticateUser,
    (req, res, next) => {
        req.permittedRoles = ['doctor']
        next()
    }, authorizeUser, appointmentCtlr.getConfirmedAppointments)

// app.put('/appointments/:appointmentId/slots/:slotId/book', appointmentCtlr.bookSlot)

app.post('/api/checkout', authenticateUser,
    (req, res, next) => { console.log(req.body, 'req checkout')
        req.permittedRoles = ['doctor', 'patient']
        next()
    },authorizeUser, paymentCtlr.checkout)

app.post('/api/paymentstatus', authenticateUser,
    (req, res, next) => {
        req.permittedRoles = ['doctor', 'patient']
        next()
    },authorizeUser, paymentCtlr.paymentStatus)

app.get('/payment/success', authenticateUser,
    (req,res, next) => {
        req.permittedRoles = ['patient']
        next()
    }, authorizeUser, paymentCtlr.paymentSuccess)

app.listen(PORT, () => {
    console.log('server running on port', PORT)
})
