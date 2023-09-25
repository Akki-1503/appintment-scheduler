const Slot = require('../models/slotModel')
const { parseISO, addMinutes, isBefore, format } = require('date-fns')

const slotCtlr = {}

slotCtlr.create = async (req, res) => {
    try {
        const body = req.body
        console.log('Received request with body:', req.body)
        const doctorId = req.user._id
        const slots = []

        // Parse input dates and times
        const startDateUTC = new Date(`${body.startDate}T${body.startTime}Z`)
        const endDateUTC = new Date(`${body.endDate}T${body.endTime}Z`)
        const intervalInMinutes = body.interval

        console.log('startDateUTC:', startDateUTC)
        console.log('endDateUTC:', endDateUTC)

        let currentDate = startDateUTC

        while (currentDate <= endDateUTC) {
            // Ensure the slot is within the specified time range for each day
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
                    })
                    slots.push(slot)
                }
            }
            // Move to the next interval
            currentDate = new Date(currentDate.getTime() + intervalInMinutes * 60000)
        }

        const insertedSlots = await Slot.insertMany(slots)
        return res.json(insertedSlots)
    } catch (error) {
        return res.json({ message: error.message })
    }
}

// slotCtlr.create = async (req, res) => {
//     try {
//         const body = req.body
//         console.log('Received request with body:', req.body)
//         const doctorId = req.user._id
//         const slots = []

//         // Parse input dates and times
//         const startDateUTC = new Date(`${body.startDate}T${body.startTime}:00.000Z`)
//         const endDateUTC = new Date(`${body.endDate}T${body.endTime}:00.000Z`)
//         const intervalInMinutes = body.interval

//         console.log('startDateUTC:', startDateUTC)
//         console.log('endDateUTC:', endDateUTC)

//         let currentDate = startDateUTC

//         while (currentDate <= endDateUTC) {
//             const slotEndTime = new Date(currentDate.getTime() + intervalInMinutes * 60000)

//             if (slotEndTime <= endDateUTC) {
//                 const slot = new Slot({
//                     startDateTime: currentDate,
//                     endDateTime: slotEndTime,
//                     interval: intervalInMinutes,
//                     doctor: doctorId,
//                 })

//                 slots.push(slot)
//             }

//             // Move to the next day
//             currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
//             currentDate.setHours(startDateUTC.getHours()) // Set the start hour for the next day
//             currentDate.setMinutes(startDateUTC.getMinutes()) // Set the start minute for the next day
//         }

//         const insertedSlots = await Slot.insertMany(slots)
//         return res.json(insertedSlots)
//     } catch (error) {
//         return res.json({ message: error.message })
//     }
// }

// slotCtlr.create = async (req, res) => {
//     try {
//         const body = req.body
//         console.log('Received request with body:', req.body)
//         const doctorId = req.user._id
//         const slots = []

//         // Parse input dates and times
//         const startDateUTC = new Date(`${body.startDate}T${body.startTime}:00.000Z`)
//         const endDateUTC = new Date(`${body.endDate}T${body.endTime}:00.000Z`)
//         const intervalInMinutes = body.interval

//         console.log('startDateUTC:', startDateUTC)
//         console.log('endDateUTC:', endDateUTC)

//         let currentDate = startDateUTC

//         while (currentDate <= endDateUTC) {
//             const slotEndTime = new Date(currentDate.getTime() + intervalInMinutes * 60000)

//             if (slotEndTime <= endDateUTC) {
//                 const slot = new Slot({
//                     startDateTime: currentDate,
//                     endDateTime: slotEndTime,
//                     interval: intervalInMinutes,
//                     doctor: doctorId,
//                 })

//                 slots.push(slot)
//             }

//             currentDate = slotEndTime
//         }

//         const insertedSlots = await Slot.insertMany(slots)
//         return res.json(insertedSlots)
//     } catch (error) {
//         return res.json({ message: error.message })
//     }
// }

// slotCtlr.create = async(req, res) => {
//     try {
//         const body = req.body
//         const doctorId = req.user._id
//       //  console.log('body',body)
//        const result =  timeSlots(body,doctorId)
//        console.log('result' , result)
//         const insertedslots = await Slot.insertMany(result)
//      //   const newSlot = new Slot(result)
//     //  const slot =  newSlot.insertMany(result)
//       //  Slot.insertMany()
//       //  const slot = await newSlot.save()
//     //  console.log('insertedslots', insertedslots)
//         res.json(insertedslots)
//     } catch(err) {
//         res.json(err)
//     }
// }

slotCtlr.list = async(req, res) => {
    try{
        const slots = await Slot.find()
        res.json(slots)
    } catch(err) {
        res.json(err)
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
        const slotId = req.params.slotId // Extract the slot ID from the request
        const updatedSlot = await Slot.findByIdAndUpdate(
            slotId,
            { isBooked: true },
            { new: true }
        )
        res.json(updatedSlot)
    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = slotCtlr