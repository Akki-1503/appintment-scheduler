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
     isBooked:{
        type: Boolean,
        default: false
     }
})

const Slot = mongoose.model('Slot', slotbookingSchema)
module.exports = Slot
