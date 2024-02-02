import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { startEditProfile, startFetchDoctorProfile, startUpdateProfile } from '../actions/drAction'
import { Form, Button, Image } from 'react-bootstrap'

function EditProfile() {
  const dispatch = useDispatch()
  const history = useHistory()

  const user = useSelector((state) => state.user)

  useEffect(() => {
    if (user.user) {
      dispatch(startFetchDoctorProfile(user.user._id))
    }
  }, [dispatch, user])

  const doctor = useSelector((state) => state.doctor.doctorProfiles)
  console.log('doctor', doctor)

  const [formData, setFormData] = useState({
    doctorName: doctor?.doctorName || '',
    email: doctor?.email || '',
    clinicAddress: doctor?.clinicAddress || '',
    clinicName: doctor?.clinicName || '',
    contact: doctor?.contact || '',
    education: doctor?.education || '',
    specialization: doctor?.specialization || '',
    experience: doctor?.experience || '',
    servicesByDoctor: doctor?.servicesByDoctor || '',
    consultationFee: doctor?.consultationFee || '',
  })

  const [avatar, setAvatar] = useState(doctor?.avatar || null)

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    setAvatar(URL.createObjectURL(file))
    setFormData({
      ...formData,
      avatar: file,
    })
  }
  console.log('handleavatarchange', handleAvatarChange)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const updatedDoctorData = {
      ...doctor,
      ...formData,
      avatar: avatar
    }
    console.log(formData, 'formdata') 
    console.log(avatar, 'avatar')
    console.log( 'updatedDoctordata', updatedDoctorData)

    try {
      if (formData.avatar) {
        await dispatch(startEditProfile(updatedDoctorData, formData.avatar, doctor._id, history))
      }
      history.push('/account')
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }
    
  return (
    <div>
      <h2>Edit Profile</h2>
      <Form onSubmit={handleSubmit}>
        {avatar && (
          <Image
            src={avatar}
            alt="Doctor Avatar"
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
        )}
        <Form.Group controlId="formAvatar">
          <Form.Label>Change Avatar</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleAvatarChange} />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formDoctorName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="doctorName"
            placeholder="Name"
            value={formData.doctorName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId='clinicName'>
            <Form.Label>Clinic Name</Form.Label>
            <Form.Control 
                type='text'
                placeholder='Clinic Name'
                value={formData.clinicName}
                name='clinicName'
                onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId='contact'>
            <Form.Label>Contact</Form.Label>
            <Form.Control 
                type='text'
                placeholder='contact'
                value={formData.contact}
                name='contact'
                onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId='clinicAddress'>
            <Form.Label>Clinic Address</Form.Label>
            <Form.Control 
                type='text'
                placeholder='clinic address'
                value={formData.clinicAddress}
                name='clinicAddress'
                onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId='education'>
            <Form.Label>Education</Form.Label>
            <Form.Control 
                type='text'
                placeholder='education'
                value={formData.education}
                name='education'
                onChange={handleChange} />
        </Form.Group> 

        <Form.Group controlId='experience'>
            <Form.Label>Experience</Form.Label>
            <Form.Control 
                type='text'
                placeholder='experience'
                value={formData.experience}
                name='experience'
                onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId='consultationFee'>
            <Form.Label>Consultation Fee</Form.Label>
            <Form.Control 
                type='number'
                placeholder='consultationFee'
                value={formData.consultationFee}
                name='consultationFee'
                onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId='specialization'>
            <Form.Label>Specialization</Form.Label>
            <Form.Control 
                type='text'
                placeholder='specialization'
                value={formData.specialization}
                name='specialization'
                onChange={handleChange} />
        </Form.Group>
        
        
        <Form.Group controlId='servicesByDoctor'>
            <Form.Label>Services By Doctor</Form.Label>
            <Form.Control 
                type='text'
                placeholder='servicesByDoctor'
                value={formData.servicesByDoctor}
                name='servicesByDoctor'
                onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </div>
  )
}

export default EditProfile
