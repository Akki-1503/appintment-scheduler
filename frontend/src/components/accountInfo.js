import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startGetUserAccount} from '../actions/userAction' // Import your account retrieval action

function AccountInfo() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user) // Assuming user data is stored in the Redux state

  useEffect(() => {
    // Dispatch the account retrieval action when the component mounts
    dispatch(startGetUserAccount())
  }, [dispatch])

  return (
    <div>
      <h2>Account Information</h2>
      {user.isAuthenticated ? (
        <div>
          <p>Username: {user.user.username}</p>
          <p>Email: {user.user.email}</p>
        </div>
      ) : (
        <p>Please log in to view your account information.</p>
      )}
    </div>
  )
}

export default AccountInfo