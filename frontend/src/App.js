import React from 'react'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import RegistrationForm from './components/registrationForm' // Import your components
import LoginForm from './components/loginForm'
import AccountInfo from './components/accountInfo'
import DoctorDashboard from './components/doctorDashboard'

function App() {
  return (
      <div className="App">
        <Router>
          <Switch>
            <Route path='/register' component={RegistrationForm} exact={true} />
            <Route path='/login' component={LoginForm} />
            <Route path='/account' component={AccountInfo} />
            <Route path='/doctor-dashboard' component={DoctorDashboard} />
            <Redirect to='/register' />
          </Switch>
        </Router>

        {/* <RegistrationForm />
         <LoginForm />
        <AccountInfo />  */}
      </div>
  )
}

export default App
