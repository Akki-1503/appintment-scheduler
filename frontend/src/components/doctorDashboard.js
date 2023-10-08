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
