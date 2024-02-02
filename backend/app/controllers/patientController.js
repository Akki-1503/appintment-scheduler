const Patient = require('../models/patientModel')
const mongoose = require('mongoose')
const moment = require('moment')
const Slot = require('../models/slotModel') 

const patientCtlr = {}

patientCtlr.listBookings = async (req, res) => {
    try {
        const patientId = req.params.patientId
        console.log('patientid', patientId)

        const bookings = await Slot.find({ bookedBy: patientId, isBooked: true })

        console.log('bookings', bookings)

        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found for this patient' })
        }

        const formattedBookings = bookings.map(booking => {
            const startDateTimeUTC = moment.utc(booking.startDateTime)
            const endDateTimeUTC = moment.utc(booking.endDateTime)

            const startDateTimeIST = startDateTimeUTC.clone().tz('Asia/Kolkata').subtract(5, 'hours').subtract(30, 'minutes').format('dddd, MMMM D, YYYY h:mm A')
            const endDateTimeIST = endDateTimeUTC.clone().tz('Asia/Kolkata').subtract(5, 'hours').subtract(30, 'minutes').format('dddd, MMMM D, YYYY h:mm A')

            const doctorName = booking.doctorName || (booking.doctor ? booking.doctor.username : 'Unknown Doctor')
            console.log('doctorname', doctorName)

            return {
                doctorName: doctorName,
                _id: booking._id,
                startDateTime: startDateTimeIST,
                endDateTime: endDateTimeIST,
                interval: booking.interval,
                confirmationStatus: booking.confimationStatus
            }
        })

        console.log('formattedBookings', formattedBookings)

        res.json(formattedBookings)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

patientCtlr.create = async(req, res) => {
    try{
        const body = req.body
        const patient = new Patient(body)
        patient.user = req.user._id
        const patientDocument = await patient.save()
        res.json(patientDocument) 
    } catch(err) {
        res.json(err)
    }
}

patientCtlr.update = async(req, res) => {
    try{
        const id = req.params.id
        const body = req.body
        const patient = await Patient.findOneAndUpdate({_id:id, user: req.user.id}, body, {new: true, runValidators: true})
        res.json(patient)
    } catch(err) {
        res.json(err)
    }
}

patientCtlr.destroy = async(req, res) => {
    try{
        const id = req.params.id
        const patient = await Patient.findOneAndDelete({_id: id, user: req.user.id})
        res.json(patient)
    } catch(err) {
        res.json(err)
    }
}

module.exports = patientCtlr
