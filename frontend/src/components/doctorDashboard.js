// import React, {useState} from 'react'
// import { useDispatch } from "react-redux"
// import { useHistory } from 'react-router-dom'
// import { startUpdateProfile } from '../actions/drAction'

// function DoctorDashboard() {
//     const dispatch = useDispatch()
//     const history = useHistory()

//     // useEffect(() => {
//     //     // Dispatch the account retrieval action when the component mounts
//     //     dispatch(startUpdateProfile())
//     //   }, [dispatch])
    
//     const [formData, setFormData] = useState({
//         email: '',
//         doctorName: '',
//         contact: '',
//         clinicName: '',
//         clinicAddress: '',
//         gender: '',
//         education: '',
//         experience: '',
//         consultationFee: '',
//         specialization: '',
//         servicesByDoctor: ''
//     })

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name] : e.target.value
//         })
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         dispatch(startUpdateProfile(formData, history))
//         history.push('/account')
//     }

//     return (
//         <div>
//             <h2>Doctor Dashboard</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Email <br />
//                     <input type= 'email' name= 'email' placeholder='email' value={formData.email} onChange={handleChange} />
//                 </label> <br />

//                 <label>
//                     Name  <br />
//                     <input type= 'doctorName' name= 'doctorName' placeholder='doctorName' value={formData.doctorName} onChange={handleChange} />
//                 </label> <br />

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
//                 </label> <br />

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

//                 <input type="submit" />
//             </form>
//         </div>
//     )
// }

// export default DoctorDashboard






import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { startUpdateProfile } from '../actions/drAction';
import { Form, Button, Row, Col } from 'react-bootstrap';


function DoctorDashboard() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [formData, setFormData] = useState({
    email: '',
    doctorName: '',
    contact: '',
    clinicName: '',
    clinicAddress: '',
    gender: '',
    education: '',
    experience: '',
    consultationFee: '',
    specialization: '',
    servicesByDoctor: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(startUpdateProfile(formData, history));
    history.push('/account');
  };

  return (
    <div>
      <h2>Doctor Dashboard</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="email"
            value={formData.email}
            name="email"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="doctorName">
          <Form.Label>Doctor Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Doctor Name"
            value={formData.doctorName}
            name="doctorName"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Row} controlId="gender">
          <Form.Label as="legend" column sm={2}>
            Gender
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              label="Male"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={handleChange}
            />
            <Form.Check
              type="radio"
              label="Female"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={handleChange}
            />
          </Col>
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
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default DoctorDashboard;
import React, {useState} from 'react'
import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom'
import { startLoginUser } from "../actions/userAction"

function DoctorDashboard() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [formData, setFormData] = useState({
        email: '',
        doctorName: '',
        contact: '',
        clinicName: '',
        clinicAddress: '',
        gender: '',
        education: '',
        experience: '',
        consultationFee: '',
        specialization: '',
        servicesByDoctor: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(startLoginUser(formData))
        history.push('/login')
    }

    return (
        <div>
            <h2>Doctor Dashboard</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email <br />
                    <input type= 'email' name= 'email' placeholder='email' value={formData.email} onChange={handleChange} />
                </label> <br />

                <label>
                    Name  <br />
                    <input type= 'doctorName' name= 'doctorName' placeholder='doctorName' value={formData.doctorName} onChange={handleChange} />
                </label> <br />

                <label>
                    Gender
                </label> <br />

                <label>
                    Male
                    <input type= 'radio' name= 'gender' value='Male' checked={formData.gender === 'Male'} onChange={handleChange} />
                </label>

                <label>
                    Female
                    <input type= 'radio' name= 'gender' value='Female' checked={formData.gender === 'Female'} onChange={handleChange} />
                </label> <br />

                <label>
                    Clinic Name  <br />
                    <input type= 'clinicName' name= 'clinicName' placeholder='clinicName' value={formData.clinicName} onChange={handleChange} />
                </label> <br />

                <label>
                    Contact <br />
                    <input type= 'number' name= 'contact' placeholder='contact' value={formData.contact} onChange={handleChange} />
                </label> <br />

                <label>
                    Clinic Address  <br />
                    <input type= 'clinicAddress' name= 'clinicAddress' placeholder='clinicAddress' value={formData.clinicAddress} onChange={handleChange} />
                </label> <br />

                <label>
                    Education   <br />
                    <input type= 'education' name= 'education' placeholder='education' value={formData.education} onChange={handleChange} />
                </label> <br />

                <label>
                    Experience   <br />
                    <input type= 'experience' name= 'experience' placeholder='experience' value={formData.experience} onChange={handleChange} />
                </label> <br />

                <label>
                    Consultation Fee  <br />
                    <input type= 'number' name= 'consultationFee' placeholder='consultationFee' value={formData.consultationFee} onChange={handleChange} />
                </label> <br />

                <label>
                    Specialization   <br />
                    <input type= 'specialization' name= 'specialization' placeholder='specialization' value={formData.specialization} onChange={handleChange} />
                </label> <br />

                <label>
                    Services By Doctor  <br /> 
                    <input type= 'servicesByDoctor' name= 'servicesByDoctor' placeholder='servicesByDoctor' value={formData.servicesByDoctor} onChange={handleChange} />
                </label> <br />

                <input type="submit" />
            </form>
        </div>
    )
}

export default DoctorDashboard
