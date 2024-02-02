import React, {useEffect} from 'react'
import { Link, Route, withRouter, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { startFetchDoctorProfile } from '../actions/drAction'

const NavBar = (props) => {
  const { userLoggedIn, handleAuth, role } = props
  const { id } = useParams()
  console.log('id:', id)
  console.log('Role:', role)
  const dispatch = useDispatch()

  const doctor = useSelector((state) => state.doctor.doctorProfiles)
  console.log('doctor', doctor)
  const doctorId = doctor ? doctor._id : null
  console.log('doctorId', doctorId)
  
  const user = useSelector((state) => state.user)

  console.log('user', user)
  // const userId = user && user.user._id
  // console.log('userid', userId)

  // useEffect(() => {
  //     if (user.user) {
  //       dispatch(startFetchDoctorProfile(user.user._id))
  //     }
  //   }, [dispatch, user])

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Home
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {userLoggedIn ? (
              <>
                <Nav.Link as={Link} to='/account'>
                  Account
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/"
                  onClick={() => {
                    localStorage.removeItem('token')
                    alert('Successfully logged out')
                    handleAuth()
                  }}
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </>
            )}
            {role === 'admin' && (
              <Nav.Link as={Link} to="/admin-dashboard">
                Registered Doctors
              </Nav.Link>
            )}

            {role === 'doctor' && (
              <>
                {!doctorId && (
                  <Nav.Link as={Link} to="/doctor-dashboard">
                    Update Profile
                  </Nav.Link>
                )}
                
                  
                <Nav.Link as={Link} to="/create-slots">
                  Create Slots
                </Nav.Link>
             
                <Nav.Link as={Link} to="/doctor-profile">
                  My Profile
                </Nav.Link>
              
                <Nav.Link as={Link} to="/my-appointments">
                  My Appointments
                </Nav.Link>
                <Nav.Link as={Link} to={`/list-slots/${doctor.userId}`}>
                  My Slots
                </Nav.Link>
                <Nav.Link as={Link} to={`/list-patients/${doctor.userId}`}>
                  My Patients
                </Nav.Link>
                <Nav.Link as={Link} to={`/confirmed-appointments/${doctor.userId}`} >
                  Confirmed Appointments
                </Nav.Link>
              </>
            )}

            {(role === 'patient' || role === 'admin') && (
              <>
                <Nav.Link as={Link} to="/doctor-details">
                  List of Doctors
                </Nav.Link>
              </>
            )}

            {role === 'patient' && (
              <>
                <Nav.Link as={Link} to="/my-bookings">
                  My Bookings
                </Nav.Link>
              </>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default withRouter(NavBar)

