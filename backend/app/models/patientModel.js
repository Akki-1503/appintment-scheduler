const mongoose= require('mongoose')
const Schema = mongoose.Schema

const patientSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    gender:{
        type:String,
        required: true
    },
    phonenumber:{
        type:Number,
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    image:[{type:String}]
})

const Patient = mongoose.model('Patient', patientSchema)
module.exports = Patient