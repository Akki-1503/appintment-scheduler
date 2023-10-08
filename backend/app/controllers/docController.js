const Doctor = require('../models/doctorModel')
const User = require('../models/userModel')
const slugify = require('slugify')
const docCtlr = {}

docCtlr.list = async(req, res) => {
    try{
        const doctors = await Doctor.find({user: req.user.id})
        res.json(doctors)
    } catch(err) {
        res.json(err)
    }
}

// admin action to verify
docCtlr.verify = async(req,res)=>{
    try{
        const id = req.params.id
        const body = req.body
       // const todo= await User.findOneAndUpdate(id, body, {new: true, runValidators: true})
        const verified = await User.findByIdAndUpdate(id, body , {runValidators: true , new: true})
         res.json(verified)
    }
    catch(e){
        res.json(e)
    }
    
}
// admin action to remove doctor, once delete, call verify api and make isVerified to false again
docCtlr.remove = async(req, res) => {
        try{
            const id = req.params.id
            const doctor = await User.findByIdAndDelete(id)
            res.json(doctor)
        } catch(err) {
            res.json(err)
        }
    }

docCtlr.create = async (req, res) => {
    try {
        const body = req.body;
        const slug = slugify(`${body.doctorName}-${body.clinicName}`);
        console.log('cs', slug);
        const doctor = new Doctor({
            ...body,
            slug: slug,
            userId: req.user._id
        });
            const doctorDocument = await doctor.save();
            res.status(201).json({ message: 'Doctor profile created successfully', doctor: doctorDocument });
        } catch (err) {
            res.status(500).json({ error: 'Failed to create doctor profile', message: err.message });
    }
};
    
docCtlr.show = async(req, res) => {
    try{
        const slug = req.params.slug
        console.log("slug", slug)
        const doctor = await Doctor.findOne({slug:slug})
        //console.log(doctor)
        res.json(doctor)
    } catch(err) {
        res.json(err)
    }
}

docCtlr.update = async(req, res) => {
    try{
        const id = req.params.id
        const body = req.body
        const doctor = await Doctor.findOneAndUpdate({_id:id, user: req.user.id}, body, {new: true, runValidators: true})
        res.json(doctor)
    } catch(err) {
        res.json(err)
    }
}

docCtlr.destroy = async(req, res) => {
    try{
        const id = req.params.id
        const doctor = await Doctor.findOneAndDelete({_id: id, user: req.user.id})
        res.json(doctor)
    } catch(err) {
        res.json(err)
    }
}

module.exports = docCtlr