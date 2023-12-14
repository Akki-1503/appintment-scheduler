// import React from 'react'
// import { Link,Route, withRouter, useParams } from 'react-router-dom'
// import { useSelector } from 'react-redux'; // Import useSelector from react-redux
// import RegistrationForm from './registrationForm'
// import LoginForm from './loginForm'
// import AccountInfo from './accountInfo'
// import DoctorDashboard from './doctorDashboard'
// import Home from './home'
// import CreateSlots from './createSlots'
// import EditProfile from './editProfile'
// import DoctorDetails from './doctorDetails'
// import ListSlots from './listSlots'
// import DoctorAppointments from './doctorAppointments';
// import DoctorProfile from './doctorProfile';

// const NavBar = (props) => {
//     const { userLoggedIn, handleAuth, role } = props
//     const { id } = useParams()
//     console.log('id:', id)
  
//     const doctor = useSelector((state) => state.doctor.doctorProfiles) // Fetch doctor data from Redux store
//     console.log('doc', doctor)

//     const doctorId = doctor && doctor._id
//     console.log('did', doctorId)
  
//     return (
//       <div>
//         <ul>
//           <li>
//             <Link to='/'>Home</Link>
//           </li>
//           {userLoggedIn ? (
//             <>
//               <li>
//                 <Link to='/account'>Account</Link>
//               </li>
//               <li>
//                 <Link
//                   to='/'
//                   onClick={() => {
//                     localStorage.removeItem('token')
//                     alert('Successfully logged out')
//                     handleAuth()
//                   }}
//                 >
//                   Logout
//                 </Link>
//               </li>
//             </>
//           ) : (
//             <>
//               <li>
//                 <Link to='/register'>Register</Link>
//               </li>
//               <li>
//                 <Link to='/login'>Login</Link>
//               </li>
//             </>
//           )}
//         </ul>
  
//         <Route path='/' component={Home} exact={true} />
//         <Route path='/register' component={RegistrationForm} exact={true} />
//         <Route
//           path='/login'
//           render={(props) => {
//             return <LoginForm {...props} handleAuth={handleAuth} />
//           }}
//         />
//         <Route path='/account' component={AccountInfo} />
//         {role === 'doctor' && (
//           <>
//             <li>
//               <Link to='/doctor-dashboard'>Doctor Dashboard</Link>
//             </li>
//             <li><Link to='/create-slots'>Create Slots</Link></li>
//             <li>
//               <Link to={`/edit-profile/${doctorId}`}>Edit Profile</Link>
//             </li>
//             <li>
//               <Link to='/doctor-profile'>My Profile</Link>
//             </li>
//             <li>
//               <Link to='/my-appointments'>My Appointments</Link>
//             </li>
//             <Route path='/doctor-dashboard' component={DoctorDashboard} />
//           </>
//         )}
//         <Route path='/create-slots' component={CreateSlots} />
//         <Route path='/edit-profile/:id' component={EditProfile} />
//         <Route path='/my-appointments' component={DoctorAppointments} />
//         <Route path='/doctor-profile' component={DoctorProfile} />
  
//         {(role === 'patient' || role === 'user') && (
//           <>
//             <li>
//               <Link to='/doctor-details'>List of Doctors</Link>
//             </li>
//           </>
//         )}
//         <Route path='/doctor-details' component={DoctorDetails} />
//         <Route path='/list-slots/:id' component={ListSlots} />
//       </div>
//     )
//   }
  
//   export default withRouter(NavBar)
  













import React, {useEffect} from 'react';
import { Link, Route, withRouter, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { startFetchDoctorProfile } from '../actions/drAction';

const NavBar = (props) => {
  const { userLoggedIn, handleAuth, role } = props;
  const { id } = useParams();
  console.log('id:', id);
  console.log('Role:', role);
  const dispatch = useDispatch()

  const doctor = useSelector((state) => state.doctor.doctorProfiles);
  console.log('doctor', doctor);
  const doctorId = doctor && doctor._id;
  console.log('doctorId', doctorId)
  
  // const user = useSelector((state) => state.user);

  // console.log('user', user)
  // // const userId = user && user.user._id
  // // console.log('userid', userId)

  // useEffect(() => {
  //     if (user.user) {
  //       dispatch(startFetchDoctorProfile(user.user._id));
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
                    localStorage.removeItem('token');
                    alert('Successfully logged out');
                    handleAuth();
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
                <Nav.Link as={Link} to="/doctor-dashboard">
                  Update Profile
                </Nav.Link>
                <Nav.Link as={Link} to="/create-slots">
                  Create Slots
                </Nav.Link>
                <Nav.Link as={Link} to={`/edit-profile/${doctorId}`}>
                  Edit Profile
                </Nav.Link>
                <Nav.Link as={Link} to="/doctor-profile">
                  My Profile
                </Nav.Link>
                <Nav.Link as={Link} to="/my-appointments">
                  My Appointments
                </Nav.Link>
              </>
            )}

            {(role === 'patient' || role === 'user') && (
              <>
                <Nav.Link as={Link} to="/doctor-details">
                  List of Doctors
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default withRouter(NavBar);



// import React from 'react';
// import { Link, Route, withRouter, useParams, Switch } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import RegistrationForm from './registrationForm';
// import LoginForm from './loginForm';
// import AccountInfo from './accountInfo';
// import DoctorDashboard from './doctorDashboard';
// import Home from './home';
// import CreateSlots from './createSlots';
// import EditProfile from './editProfile';
// import DoctorDetails from './doctorDetails';
// import ListSlots from './listSlots';
// import DoctorAppointments from './doctorAppointments';
// import DoctorProfile from './doctorProfile';
// import Payment from './payment';
// import AdminDashboard from './adminDashboard';

// const NavBar = (props) => {
//   const { userLoggedIn, handleAuth, role } = props;
//   const { id } = useParams()
//   const doctor = useSelector((state) => state.doctor.doctorProfiles);
//   const doctorId = doctor && doctor._id

//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg navbar-light bg-light">
//         <div className="container">
//           <Link className="navbar-brand" to="/">Home</Link>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNav"
//             aria-controls="navbarNav"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav">
//               {!userLoggedIn ? (
//                 <>
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/register">Register</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/login">Login</Link>
//                   </li>
//                 </>
//               ) : (
//                 <>
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/account">Account</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link
//                       className="nav-link"
//                       to="/"
//                       onClick={() => {
//                         localStorage.removeItem('token');
//                         alert('Successfully logged out');
//                         handleAuth();
//                       }}
//                     >
//                       Logout
//                     </Link>
//                   </li>
//                 </>
//               )}
//             </ul>
//           </div>
//         </div>
//       </nav>

//       <Switch>
//         <Route path="/" component={Home} exact={true} />
//         <Route path="/register" component={RegistrationForm} />
//         <Route
//           path="/login"
//           render={(props) => {
//             return <LoginForm {...props} handleAuth={handleAuth} />;
//           }}
//         />
//         <Route path="/account" component={AccountInfo} />
//         <Route path='/admin-dashboard' component={AdminDashboard} />
//         <Route path="/doctor-dashboard" component={DoctorDashboard} />
//         <Route path="/create-slots" component={CreateSlots} />
//         <Route path="/edit-profile/:id" component={EditProfile} />
//         <Route path="/my-appointments" component={DoctorAppointments} />
//         <Route
//           path="/doctor-profile"
//           render={() => <DoctorProfile doctorId={doctorId} />}
//         />
//         <Route path="/payment" component={Payment} />
//         <Route path="/doctor-details" component={DoctorDetails} />
//         <Route path="/list-slots/:id" component={ListSlots} />
//       </Switch>
//     </div>
//   );
// };

// export default withRouter(NavBar);
