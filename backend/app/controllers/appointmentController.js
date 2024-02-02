const Appointment = require('../models/appointmentModel')
const Slot = require('../models/slotModel')
const slugify = require('slugify')
const User = require('../models/userModel')
const Doctor = require('../models/doctorModel')
const mailer = require('../helpers/mailer')
const moment = require('moment-timezone')

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

appointmentCtlr.getDoctorSlots = async (req, res) => {
    try {
        const userId = req.query.userId 
        console.log('dr.Id app', userId)

        const appointments = await Slot.find({ 'doctor': userId, 'isBooked': true })

        if (!appointments || appointments.length === 0) {
            return res.status(404).json({ message: 'No appointments available' })
        }

        const updatedAppointments = appointments.map(appointment => {
            return ({
                _id: appointment._id,
                startDateTime: appointment.startDateTime,
                endDateTime: appointment.endDateTime,
                patientName: appointment.bookedByUsername,
                interval: appointment.interval,
                doctor: appointment.doctor,
                isBooked: appointment.isBooked,
                confimationStatus: appointment.confimationStatus
            })
        })

        res.json(updatedAppointments)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

appointmentCtlr.show = async(req, res) => {
    try{
        const id = req.params.id
        console.log('id', id)
        const appointment = await Appointment.findOne({_id: id})
            .populate('doctor')
            .populate('slots')
            .populate('user')
        console.log('app', appointment)
        res.json(appointment)
    } catch(err) {
        res.json(err)
    }
}

appointmentCtlr.update = async (req, res) => {
    try {
      const id = req.params.id
      console.log('email id', id)
      const body = req.body
      console.log('body', body)
      const updatedSlot = await Slot.findByIdAndUpdate(
        { _id: id },
        { confimationStatus: body.confimationStatus },
        { new: true }
      )
      console.log('updatedSlot', updatedSlot)
      const recipientEmail = updatedSlot.bookedByEmail 
      console.log('recipientemail', recipientEmail)
      let emailSubject, emailContent
      const doctorName = updatedSlot.doctorName
      console.log('doctordetails', doctorName)

      const startDateTime = updatedSlot.startDateTime 
      console.log('startdatetime', startDateTime)
        
      const utcDateTime = moment.utc(startDateTime)
      const ISTDateTime = utcDateTime.tz('Asia/Kolkata').subtract(5, 'hours').subtract(30, 'minutes').format('dddd, MMMM D, YYYY h:mm A')
      
      if (body.confimationStatus === 'confirmed') {
        emailSubject = 'Appointment Confirmation'
        emailContent = `Your appointment for consulting Dr. ${doctorName} on ${ISTDateTime} has been confirmed by the doctor.`
      } else if (body.confimationStatus === 'cancelled') {
        emailSubject = 'Appointment Cancellation'
        emailContent = `Your appointment for consulting Dr. ${doctorName} on ${ISTDateTime} has been cancelled by the doctor due to emergency reasons. You can book your appointment again, and your payment will be refunded within 48 business hours.`
      }
      
        
      mailer.sendEmail(
        process.env.USER_EMAIL,
        recipientEmail,
        emailSubject,
        emailContent,
        (error, response) => {
          if (error) {
            console.error('email sending failed:', error)
          } else {
            console.log('email sent successfully:', response)
          }
        }
      )
  
      res.json(updatedSlot)
    } catch (err) {
      res.json(err)
    }
  }
  
appointmentCtlr.getConfirmedAppointments = async (req, res) => {
  try{
    const userId = req.params.userId
    console.log('userid', userId)
    const confirmedAppointments = await Slot.find({ doctor : userId, confimationStatus: 'confirmed'})
    console.log('confirmedappointments', confirmedAppointments)
    res.json(confirmedAppointments)
  } catch (err) {
    console.log('err', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = appointmentCtlr
