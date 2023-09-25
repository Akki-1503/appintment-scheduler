const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')

const doctorSchema = new mongoose.Schema({
    doctorName : {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: Number,
        required: true
    },
    clinicName: {
        type: String,
        required: true
    },
    clinicAddress: {
        type: String
    },
    servicesByDoctor: [{type: String}],
    gender: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    consultationFee: {
        type: Number
    },
    slug:{
        type: String
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    specialization: [{type: String}]
})

doctorSchema.plugin(slug)
const Doctor = mongoose.model('Doctor', doctorSchema)
module.exports = Doctor