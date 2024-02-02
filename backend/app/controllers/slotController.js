const Slot = require('../models/slotModel')
const { parseISO, addMinutes, isBefore, format } = require('date-fns')
const User = require('../models/userModel')
const Doctor = require('../models/doctorModel')

const slotCtlr = {}

slotCtlr.create = async (req, res) => {
    try {
        const body = req.body
        console.log('Received request with body:', req.body)
        console.log('req.user:', req.user)
        const doctorId = req.user._id
        console.log('doctorid', doctorId)
        const slots = []
        let doctorName = '' 

        const doctor = await Doctor.findOne({userId: doctorId})
        console.log('doctor', doctor)

        if (doctor) {
            console.log('Doctor Information:', doctor)
            doctorName = doctor.doctorName
            console.log('Doctor Name:', doctorName)
        } else {
            console.log('Doctor not found with ID:', doctorId)
        }

        const startDateUTC = new Date(`${body.startDate}T${body.startTime}Z`)
        const endDateUTC = new Date(`${body.endDate}T${body.endTime}Z`)
        const intervalInMinutes = body.interval

        console.log('startDateUTC:', startDateUTC)
        console.log('endDateUTC:', endDateUTC)

        let currentDate = startDateUTC

        while (currentDate <= endDateUTC) {
            if (
                currentDate.getUTCHours() >= startDateUTC.getUTCHours() &&
                currentDate.getUTCHours() < endDateUTC.getUTCHours()
            ) {
                const slotEndTime = new Date(currentDate.getTime() + intervalInMinutes * 60000)

                if (slotEndTime <= endDateUTC) {
                    const slot = new Slot({
                        startDateTime: currentDate,
                        endDateTime: slotEndTime,
                        interval: intervalInMinutes,
                        doctor: doctorId, 
                        doctorName: doctorName
                    })
                    slots.push(slot)
                }
            }
            currentDate = new Date(currentDate.getTime() + intervalInMinutes * 60000)
        }

        const insertedSlots = await Slot.insertMany(slots)
        return res.json(insertedSlots)
    } catch (error) {
        return res.json({ message: error.message })
    }
}

slotCtlr.list = async (req, res) => {
    try {
      const userId = req.params.userId
      console.log('userId', userId)
      
      const slots = await Slot.find({ doctor: userId })
      console.log('slots', slots)
    
      if (!slots || slots.length === 0) {
        return res.status(404).json({ message: 'No slots found for this doctor' })
      }
      res.json(slots)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
}

slotCtlr.destroy = async(req, res) => {
    try{
        const id = req.params.id
        const deletedSlot = await Slot.findOneAndDelete({_id: id, doctor: req.user._id})
        res.json(deletedSlot)
    } catch(err) {
        res.json(err)
    }
}

slotCtlr.update = async (req, res) => {
    try{
        const id = req.params.id
        const body = req.body
        const slot = await Slot.findOneAndUpdate({_id: id, doctor: req.user._id}, body, {new: true, runValidators: true})
        res.json(slot)
    } catch(err) {
        res.json(err)
    }
}

slotCtlr.bookSlot = async (req, res) => {
  try {
    const slotId = req.params.slotId

    const user = await User.findById(req.user._id)
    console.log('user', user)

    const username = user.username

    const email = user.email

    const updatedSlot = await Slot.findByIdAndUpdate(
      slotId,
      { isBooked: true, bookedBy: user, bookedByUsername: username, bookedByEmail: email },
      { new: true }
    )

    res.json({ updatedSlot })
  } catch (error) {
    res.json({ message: error.message })
  }
}

module.exports = slotCtlr
