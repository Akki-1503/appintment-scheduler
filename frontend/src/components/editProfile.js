// import React, {useEffect, useState} from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { useHistory, useParams } from 'react-router-dom'
// import { startEditProfile, startFetchDoctorProfile } from "../actions/drAction"

// function EditProfile() {
//     const dispatch = useDispatch()
//     const history = useHistory()
//     const {id} = useParams()
//     console.log('id:', id)

//     const doctor = useSelector((state) => state.doctor.doctorProfiles)
//     console.log('Doctor:', doctor)
    
//     const [formData, setFormData] = useState({
//             doctorName: doctor?.doctorName || '',
//             email: doctor?.email || '',
//             clinicAddress: doctor?.clinicAddress || '',
//             clinicName: doctor?.clinicName || '',
//             contact: doctor?.contact || '', 
//             education: doctor?.education || '',
//             specialization: doctor?.specialization || '',
//             experience: doctor?.experience || '',
//             servicesByDoctor: doctor?.servicesByDoctor || '',
//             consultationFee: doctor?.consultationFee || ''
//     })

//     useEffect(() => {
//         dispatch(startFetchDoctorProfile(id))
//     }, [dispatch, id])

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name] : e.target.value
//         })
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         dispatch(startEditProfile(formData, history))
//     }

//     return (
//         <div>
//             <h2>Edit Profile</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Email <br />
//                     <input type= 'email' name= 'email' placeholder='email' value={formData.email} onChange={handleChange} />
//                 </label> <br />

//                 <label>
//                     Name  <br />
//                     <input type= 'doctorName' name= 'doctorName' placeholder='doctorName' value={formData.doctorName} onChange={handleChange} />
//                 </label> <br />
// {/* 
//                 <label>
//                     Gender
//                 </label> <br />

//                 <label>
//                     Male
//                     <input type= 'radio' name= 'gender' value='Male' checked={formData.gender === 'Male'} onChange={handleChange} />
//                 </label>

//                 <label>
//                     Female
//                     <input type= 'radio' name= 'gender' value='Female' checked={formData.gender === 'Female'} onChange={handleChange} />
//                 </label> <br /> */}

//                 <label>
//                     Clinic Name  <br />
//                     <input type= 'clinicName' name= 'clinicName' placeholder='clinicName' value={formData.clinicName} onChange={handleChange} />
//                 </label> <br />

//                 <label>
//                     Contact <br />
//                     <input type= 'number' name= 'contact' placeholder='contact' value={formData.contact} onChange={handleChange} />
//                 </label> <br />

//                 <label>
//                     Clinic Address  <br />
//                     <input type= 'clinicAddress' name= 'clinicAddress' placeholder='clinicAddress' value={formData.clinicAddress} onChange={handleChange} />
//                 </label> <br />

//                 <label>
//                     Education   <br />
//                     <input type= 'education' name= 'education' placeholder='education' value={formData.education} onChange={handleChange} />
//                 </label> <br />

//                 <label>
//                     Experience   <br />
//                     <input type= 'experience' name= 'experience' placeholder='experience' value={formData.experience} onChange={handleChange} />
//                 </label> <br />

//                 <label>
//                     Consultation Fee  <br />
//                     <input type= 'number' name= 'consultationFee' placeholder='consultationFee' value={formData.consultationFee} onChange={handleChange} />
//                 </label> <br />

//                 <label>
//                     Specialization   <br />
//                     <input type= 'specialization' name= 'specialization' placeholder='specialization' value={formData.specialization} onChange={handleChange} />
//                 </label> <br />

//                 <label>
//                     Services By Doctor  <br /> 
//                     <input type= 'servicesByDoctor' name= 'servicesByDoctor' placeholder='servicesByDoctor' value={formData.servicesByDoctor} onChange={handleChange} />
//                 </label> <br />

//                 <input type="submit" value='save changes' />
//             </form>
//         </div>
//     )
// }

// export default EditProfile



// import React, { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { useHistory, useParams } from 'react-router-dom'
// import { startEditProfile, startFetchDoctorProfile } from "../actions/drAction"

// function EditProfile() {
//     const dispatch = useDispatch()
//     const history = useHistory()
//     const { id } = useParams()

//     const doctor = useSelector((state) => state.doctor.doctorProfiles)

//     const [formData, setFormData] = useState({
//         doctorName: doctor?.doctorName || '',
//         email: doctor?.email || '',
//         clinicAddress: doctor?.clinicAddress || '',
//         clinicName: doctor?.clinicName || '',
//         contact: doctor?.contact || '',
//         education: doctor?.education || '',
//         specialization: doctor?.specialization || '',
//         experience: doctor?.experience || '',
//         servicesByDoctor: doctor?.servicesByDoctor || '',
//         consultationFee: doctor?.consultationFee || ''
//     })

//     useEffect(() => {
//         dispatch(startFetchDoctorProfile(id))
//     }, [dispatch, id])

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         })
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         dispatch(startEditProfile(formData, history))
//     }

//     return (
//         <div>
//             <h2>Edit Profile</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Email <br />
//                     <input type='email' name='email' placeholder='email' value={formData.email} onChange={handleChange} />
//                 </label> <br />

//                 <label>
//                     Name  <br />
//                     <input type='text' name='doctorName' placeholder='doctorName' value={formData.doctorName} onChange={handleChange} />
//                 </label> <br />

//                 <label>
//                     Clinic Name  <br />
//                     <input type='text' name='clinicName' placeholder='clinicName' value={formData.clinicName} onChange={handleChange} />
//                 </label> <br />

//                 <label>
//                     Contact <br />
//                     <input type='text' name='contact' placeholder='contact' value={formData.contact} onChange={handleChange} />
//                 </label> <br />

//                 <label>
//                     Clinic Address  <br />
//                     <input type='text' name='clinicAddress' placeholder='clinicAddress' value={formData.clinicAddress} onChange={handleChange} />
//                 </label> <br />

//                 <label>
//                     Education   <br />
//                     <input type='text' name='education' placeholder='education' value={formData.education} onChange={handleChange} />
//                 </label> <br />

//                 <label>
//                     Experience   <br />
//                     <input type='text' name='experience' placeholder='experience' value={formData.experience} onChange={handleChange} />
//                 </label> <br />

//                 <label>
//                     Consultation Fee  <br />
//                     <input type='text' name='consultationFee' placeholder='consultationFee' value={formData.consultationFee} onChange={handleChange} />
//                 </label> <br />

//                 <label>
//                     Specialization   <br />
//                     <input type='text' name='specialization' placeholder='specialization' value={formData.specialization} onChange={handleChange} />
//                 </label> <br />

//                 <label>
//                     Services By Doctor  <br /> 
//                     <input type='text' name='servicesByDoctor' placeholder='servicesByDoctor' value={formData.servicesByDoctor} onChange={handleChange} />
//                 </label> <br />

//                 <input type="submit" value='Save Changes' />
//             </form>
//         </div>
//     )
// }

// export default EditProfile



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { startEditProfile, startFetchDoctorProfile } from '../actions/drAction';
import { Form, Button } from 'react-bootstrap';

function EditProfile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.user) {
      dispatch(startFetchDoctorProfile(user.user._id));
    }
  }, [dispatch, user]);

  const doctor = useSelector((state) => state.doctor.doctorProfiles);

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
  });

  // useEffect(() => {
  //   dispatch(startFetchDoctorProfile(id));
  // }, [dispatch, id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(startEditProfile(formData, history));
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <Form onSubmit={handleSubmit}>
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
                name='clinicalAddress'
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

        <Form.Group controlId='Contact'>
            <Form.Label>Contact</Form.Label>
            <Form.Control 
                type='text'
                placeholder='contact'
                value={formData.contact}
                name='contact'
                onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId='consultationFee'>
            <Form.Label>Consultation Fee</Form.Label>
            <Form.Control 
                type='text'
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
  );
}

export default EditProfile;
