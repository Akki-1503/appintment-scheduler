const Appointment = require('../models/appointmentModel')
const Slot = require('../models/slotModel')
const slugify = require('slugify')
const User = require('../models/userModel')
const Doctor = require('../models/doctorModel')
const mailer = require('../helpers/mailer')

const appointmentCtlr = {}

appointmentCtlr.create = async(req, res) => {
    try{
        const body = req.body
        console.log('body', body)
        const slug = slugify(`${body.doctor}`)
        console.log('slug', slug)
        const appointment = new Appointment({...body,slug: slug})
        const appointmentDoc = await appointment.save()
        res.json(appointmentDoc)
    }catch(err) {
        res.json(err)
    }
}

// appointmentCtlr.showBookedSlots = async(req, res) => {
//     try{
//         const isDoctor = req.user.role === 'doctor'
//         const query = isDoctor? {doctor: req.user.id, status: 'confirmed'} : {user: req.user.id, status: 'confirmed'}
//         const appointments = await Appointment.find(query)
//             .populate(slots)
//         res.json(appointments)
//     } catch(err) {
//         res.json(err)
//     }
// }

appointmentCtlr.getAvailableSlots = async(req, res) => {
    try{
        const doctorSlug = req.query.doctorSlug
        //console.log('gas', doctorSlug)
        const doctor = await Doctor.findOne({slug: doctorSlug})
        //console.log('doc', doctor)
        const availableSlots = await Slot.find({isBooked: false})
        //console.log('as', availableSlots)
        res.json(availableSlots)
    } catch(err) {
        res.json(err)
    }
}

// appointmentCtlr.getAvailableSlots = async (req, res) => {
//     try {
//         const doctorId = req.params.id // Assuming you pass the doctor's ID in the URL
//         const doctor = await Doctor.findById(doctorId)
//         const availableSlots = await Slot.find({ isBooked: false })
//         res.json(availableSlots)
//     } catch (err) {
//         res.status(500).json({ error: 'Internal server error' })
//     }
// }


appointmentCtlr.getDoctorSlots = async (req, res) => {
    try {
        const doctorSlug = req.query.doctorSlug
        //console.log('ds', doctorSlug)
        const doctor = await Doctor.findOne({slug: doctorSlug})
        //console.log(doctor, 'doc')
        const slots = await Slot.find({ isBooked: true })
        res.json(slots)
    } catch (err) {
        res.json({ message: err.message })
    }
}

appointmentCtlr.show = async(req, res) => {
    try{
        const slug = req.params.slug
        console.log('show slug', slug)
        const appointment = await Appointment.findOne({slug})
            .populate('doctor')
            .populate('slots')
            .populate('user')
        console.log('app', appointment)
        res.json(appointment)
    } catch(err) {
        res.json(err)
    }
}

appointmentCtlr.update = async(req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        const data = await Slot.findByIdAndUpdate({_id: id}, {isBooked: body.isBooked}, {new: true})
        const recipientEmail = 'm.r.akhilab1122@gmail.com'
        let emailSubject, emailContent
        if(body.isBooked) {
            emailSubject= 'Slot Booking Confirmation'
            emailContent= 'Your slot has been booked.'
        } else {
            emailSubject= 'Slot Cancellation'
            emailContent= 'Your slot has been cancelled'
        }
        mailer.sendEmail(
            "sushmithasp.murthy@gmail.com",
            recipientEmail,
            emailSubject,emailContent,
            (error, response) => {
                if(error) {
                    console.error('email sending failed:', error)
                } else {
                    console.log('email sent successfully:', response)
                }
            }
        )
        res.json(data)
    } catch(err) {
        res.json(err)
    }
}

appointmentCtlr.updateStatus = async(req, res) => {
    try{
        const id = req.params.id
        const body = req.body
        const data = await Appointment.findByIdAndUpdate({_id: id}, {status: body.status}, {new: true})
        res.json(data)
    } catch(err) {
        res.json(err)
    }
}
 
module.exports = appointmentCtlr