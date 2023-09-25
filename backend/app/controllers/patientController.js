const Patient = require('../models/patientModel')
const patientCtlr = {}

patientCtlr.create = async(req, res) => {
    try{
        const body = req.body
        const patient = new Patient(body)
        patient.user = req.user._id
        const patientDocument = await patient.save()
        res.json(patientDocument) 
    } catch(err) {
        res.json(err)
    }
}

patientCtlr.update = async(req, res) => {
    try{
        const id = req.params.id
        const body = req.body
        const patient = await Patient.findOneAndUpdate({_id:id, user: req.user.id}, body, {new: true, runValidators: true})
        res.json(patient)
    } catch(err) {
        res.json(err)
    }
}

patientCtlr.destroy = async(req, res) => {
    try{
        const id = req.params.id
        const patient = await Patient.findOneAndDelete({_id: id, user: req.user.id})
        res.json(patient)
    } catch(err) {
        res.json(err)
    }
}

module.exports = patientCtlr