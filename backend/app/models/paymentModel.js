const mongoose = require('mongoose')
const paymentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        // required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
    },
    slot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Slot',
        required: true
    },
    modeOfPayment: {
        type: String
    },
    amount: {
        type: Number,
        // required: true
    },
    status: {
        type: String,
        enum: ['failed', 'pending', 'success'],
        default: 'pending'
    },
    paymentId : {
        type : String
    },
    paymentDate:{
        type : Date,
        default : new Date
    }
}, {timestamps: true})

const Payment = mongoose.model('Payment', paymentSchema)
module.exports = Payment
