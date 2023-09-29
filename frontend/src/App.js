import React from 'react';
import RegistrationForm from './RegistrationForm'; // Import your components
import LoginForm from './LoginForm';
import AccountInfo from './AccountInfo';

function App() {
  return (
      <div className="App">
        <h1>My App</h1>
        <RegistrationForm />
        <LoginForm />
        <AccountInfo />
      </div>
  );
}

export default App;
