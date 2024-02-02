const mongoose= require('mongoose')
const Schema = mongoose.Schema

const slotbookingSchema = new Schema({
    startDateTime:{
        type: Date,
        required: true
    },
    endDateTime:{
        type:Date,
        required: true
    },
    interval:{
        type: Number,
        required: true
    },
    doctor:{
        type:Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    doctorName: {
        type: String
    },
    bookedBy:{
        type:Schema.Types.ObjectId,
        ref: 'User',
    },
    bookedByUsername: {
        type: String
    },
    bookedByEmail: {
        type: String
    },
     isBooked:{
        type: Boolean,
        default: false
    },
    confimationStatus: {
        type: String,
        enum: ['confirmed', 'cancelled', 'pending'],
        default: 'pending'
    }
})

const Slot = mongoose.model('Slot', slotbookingSchema)
module.exports = Slot
