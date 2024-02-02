import React, { useState, useEffect } from 'react'
import NavBar from './components/navbar'
import jwt_decode from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import './components/timeZone'
import { startGetUserAccount } from './actions/userAction'
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import RegistrationForm from "./components/registrationForm"
import LoginForm from "./components/loginForm"
import AccountInfo from "./components/accountInfo"
import DoctorDashboard from "./components/doctorDashboard"
import Home from "./components/home"
import CreateSlots from "./components/createSlots"
import EditProfile from "./components/editProfile"
import DoctorDetails from "./components/doctorDetails"
import ListSlots from "./components/listSlots"
import DoctorAppointments from "./components/doctorAppointments"
import DoctorProfile from "./components/doctorProfile"
import Payment from "./components/payment"
import AdminDashboard from "./components/adminDashboard"
import 'bootstrap/dist/css/bootstrap.min.css'
import PaymentSuccess from "./components/paymentSuccess"
import PaymentFailure from './components/paymentFailure'
import { BookingProvider } from './components/bookingContext'
import BookingsList from './components/bookingList'
import DoctorPatientsList from './components/patientsList'
import ConfirmedAppointmentsCalendar from './components/confirmedAppointments'

const App = (props) => {
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [role, setRole] = useState('')
    const dispatch = useDispatch()

    const doctor = useSelector((state) => state.doctor.doctorProfiles);
    console.log('doctor', doctor)
    const doctorId = doctor?._id
    console.log('doctorId', doctorId)
    const userId = doctor.userId
    console.log('userId', userId)

    const handleAuth = () => {
        setUserLoggedIn(!userLoggedIn) 
    }

    useEffect(() => {
        if(userLoggedIn) {
            const token = localStorage.getItem('token')
            const decoded = jwt_decode(token)
            const userRole = decoded.role
            setRole(userRole)
        }
    }, [ userLoggedIn])

    useEffect(() => {
        if(localStorage.getItem('token')) {
            handleAuth()
            dispatch(startGetUserAccount())
        }
        
    }, [dispatch])

    return (
        <div>
            <NavBar userLoggedIn={userLoggedIn} handleAuth={handleAuth} role={role} />
                <div className="container mt-4">
                    <Switch>
                        <Route path="/" component={Home} exact={true} />
                        <Route path="/register" component={RegistrationForm} exact={true} />
                        <Route path="/login" render={(props) => {
                            return <LoginForm {...props} handleAuth={handleAuth} />
                        }}
                        />
                        <Route path="/account" component={AccountInfo} />
                        <Route path='/admin-dashboard' component={AdminDashboard} />
                        <Route path="/doctor-dashboard" component={DoctorDashboard} />
                        <Route path="/create-slots" component={CreateSlots} />
                        <Route path="/edit-profile/:id" component={EditProfile} />
                        <Route path="/my-appointments" component={DoctorAppointments} />
                        <Route path="/confirmed-appointments/:userId" render={() => <ConfirmedAppointmentsCalendar userId={userId} /> } />
                        <Route
                            path="/doctor-profile"
                            render={() => <DoctorProfile doctorId={doctorId} />}
                        />
                        <Route path="/payment/success" component={PaymentSuccess} />
                        <Route path="/payment" component={Payment} />
                        <Route path="/doctor-details" component={DoctorDetails} />
                        <Route path="/list-slots/:userId" component={ListSlots} />
                        <Route path="/payment/cancel" component={PaymentFailure} />
                        <Route path="/list-patients/:doctorId" component={DoctorPatientsList} />
                        
                        <BookingProvider>
                            <Route path="/my-bookings" component={BookingsList} />
                        </BookingProvider>
                    </Switch>
                </div>
        </div>
    )
}

export default App
