const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')

const appointmentSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    slots: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Slot',
        requied: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['cancelled', 'confirmed', 're-schedule'],
        default:  'cancelled',
        required: true
    },
    slug:{
        type: String
    }
})

appointmentSchema.plugin(slug)
const Appointment = mongoose.model('Appointment', appointmentSchema)
module.exports = Appointment