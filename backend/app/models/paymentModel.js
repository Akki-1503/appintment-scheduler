const mongoose = require('mongoose')
const paymentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true
    },
    modeOfPayment: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['failed', 'success'],
        required: true
    },
    razorPayId : {
        type : String
    },
    paymentDate:{
        type : Date,
        default : new Date
    }
}, {timestamps: true})

const Payment = mongoose.model('Payment', paymentSchema)
module.exports = Payment