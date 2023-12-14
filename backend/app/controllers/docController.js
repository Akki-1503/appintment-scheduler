const Doctor = require('../models/doctorModel')
const User = require('../models/userModel')
const slugify = require('slugify')
const docCtlr = {}

docCtlr.list = async(req, res) => {
    try{
        // const doctors = await Doctor.find({user: req.user.id})
        const doctors = await User.find({ role: 'doctor', isVerified: false })
        console.log('docs', doctors)
        res.json(doctors)
    } catch(err) {
        res.json(err)
    }
}

docCtlr.doclist = async(req, res) => {
    try{
        const doctors = await Doctor.find({user: req.user.id})
        console.log('doc', doctors)
        res.json(doctors)
    } catch(err) {
        res.json(err.message)
    }
}

// admin action to verify
docCtlr.verify = async(req,res)=>{
    try{
        const id = req.params.id
        const body = req.body
       // const todo= await User.findOneAndUpdate(id, body, {new: true, runValidators: true})
        const verifiedDoc = await User.findByIdAndUpdate(id, body, {runValidators: true , new: true})
        res.json(verifiedDoc)
        console.log('vd', verifiedDoc)
    }
    catch(e){
        res.json(e)
    }  
}

// docCtlr.login = async(req, res) => {
//     try{
//         const {email, password} = req.body
//         const loggedInDoc = await User.findOne({email, password, role: 'doctor'})

//         if(!loggedInDoc.isVerified) {
//             return res.status(403).json({message: 'Your account is not verified yet. Please contact Admin to Verify'})
//         }

//         return res.json({message: 'login succesfull', loggedInDoc})
//     }catch(err) {
//         res.json(err.message)
//     }
// }

docCtlr.verificationStatus = async(req, res) => {
    try{
        const id = req.params.id
        console.log('id', id)
        const doctor = await User.findById(id)

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        console.log('doc status', doctor)
        res.json({ isVerified: doctor.isVerified });
    } catch(err) {
        res.status(500).json({message: 'Error fetching doctor', error: err.message})
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
