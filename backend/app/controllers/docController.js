const User = require('../models/userModel')
const Slot = require('../models/slotModel')
const Doctor = require('../models/doctorModel') 
const slugify = require('slugify')

const docCtlr ={}
const aws = require('aws-sdk')
const uploadFileToS3 = require('../aws/s3') 

aws.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
})

const s3 = new aws.S3()

docCtlr.create = async (req, res) => {
    try {
        const body = req.body
        const slug = slugify(`${body.doctorName}-${body.clinicName}`)
        
        const uploadedFile = await uploadFileToS3(req.file, 'doctor-profiles', req.user._id)
        const avatarUrl = uploadedFile.Location
        console.log(avatarUrl, 'avatarurl')
        const doctor = new Doctor({
            ...body,
            slug: slug,
            userId: req.user._id,
            avatarUrl: avatarUrl 
        })

        const doctorDocument = await doctor.save()
        res.status(201).json({ message: 'Doctor profile created successfully', doctor: doctorDocument })
    } catch (err) {
        res.status(500).json({ error: 'Failed to create doctor profile', message: err.message })
    }
}

docCtlr.list = async(req, res) => {
    try{
        const doctors = await User.find({ role: 'doctor', isVerified: false })
        console.log('docs', doctors)
        res.json(doctors)
    } catch(err) {
        res.json(err)
    }
}

docCtlr.listPatients = async(req, res) => {
    try {
        const doctorId = req.params.doctorId
        console.log('doctorid', doctorId)
    
        const doctor = await Doctor.findOne({userId: doctorId})
        console.log('doctor', doctor)
    
        if (!doctor) {
          return res.status(404).json({ message: 'Doctor not found' })
        }
    
        const bookedSlots = await Slot.find({ doctor: doctorId, isBooked: true })
        console.log('bookedslots', bookedSlots)
    
        const patients = bookedSlots.map(slot => ({
          patientId: slot.bookedBy._id,
          patientUsername: slot.bookedByUsername,
          patientEmail: slot.bookedByEmail,
          confimationStatus: slot.confimationStatus,
          dateAndTime: slot.startDateTime,
          consultationFee: slot.consultationFee
        }))
    
        res.json({ doctor, patients })
      } catch (error) {
        res.status(500).json({ message: error.message })
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

const mailer = require('../helpers/mailer')

docCtlr.verify = async (req, res) => {
  try {
    const id = req.params.id
    const body = req.body

    const verifiedDoc = await User.findByIdAndUpdate(id, body, { runValidators: true, new: true })

    if (verifiedDoc) {
      const recipientEmail = verifiedDoc.email
      const emailSubject = 'Account Verification'
      const emailContent = `Dear ${verifiedDoc.username},\n\nYour account has been successfully verified by the admin. You can now log in and update your profile.\n\nBest regards,\nYour Hospital Team by Akhil`

      mailer.sendEmail(
        process.env.USER_EMAIL,
        recipientEmail,
        emailSubject,
        emailContent,
        (error, response) => {
          if (error) {
            console.error('Email sending failed:', error)
          } else {
            console.log('Email sent successfully:', response)
          }
        }
      )
    }

    res.json(verifiedDoc)
    console.log('vd', verifiedDoc)
  } catch (e) {
    console.error('Error verifying doctor:', e)
    res.status(500).json({ error: 'An error occurred while verifying the doctor.' })
  }
}

docCtlr.verificationStatus = async(req, res) => {
    try{
        const id = req.params.id
        console.log('id', id)
        const doctor = await User.findById(id)

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' })
        }

        console.log('doc status', doctor)
        res.json({ isVerified: doctor.isVerified })
    } catch(err) {
        res.status(500).json({message: 'Error fetching doctor', error: err.message})
    }
}

docCtlr.remove = async(req, res) => {
        try{
            const id = req.params.id
            console.log('id', id)
            const doctor = await Doctor.findOneAndDelete({ userId: id, user: req.user.id })
            console.log('deldoctor', doctor)
            res.json(doctor)
        } catch(err) {
            res.json(err)
        }
    }

    docCtlr.show = async (req, res) => {
        try {
            const id = req.params.id
            const doctor = await Doctor.findOne({ userId: id, user: req.user.id })
    
            console.log('Doctor:', doctor)
    
            if (doctor.avatar) {
                const avatarUrl = doctor.avatar.toString('utf-8')
                doctor.avatarUrl = avatarUrl
                console.log('avatarUrl', avatarUrl)
            }
    
            delete doctor.avatar
    
            res.json(doctor)
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: `Error fetching doctor details: ${err.message}` })
        }
    }
                  
    docCtlr.update = async (req, res) => {
        try {
            const doctorId = req.params.doctorId
            console.log("id", doctorId)
            const body = req.body
            console.log('body', body)
            const avatar = req.file
            console.log('avatar', avatar)
    
            let updateFields = { ...body } 

            console.log('updatefield', updateFields)
            if (avatar) {
                const uploadedFile = await uploadFileToS3(avatar, 'doctor-profiles', req.user._id)
                const avatarUrl = uploadedFile.Location
                updateFields.avatarUrl = avatarUrl
            }
    
            const doctor = await Doctor.findOneAndUpdate(
                { _id: doctorId, user: req.user.id },
                updateFields,
                { new: true, runValidators: true }
            )
    console.log('doctor', doctor)
            res.json(doctor)
        } catch (err) {
            res.status(500).json({ error: 'Failed to update doctor profile', message: err.message })
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
