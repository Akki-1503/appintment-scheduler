import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startGetUserAccount} from '../actions/userAction' // Import your account retrieval action

function AccountInfo() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user) // Assuming user data is stored in the Redux state
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)

  useEffect(() => {
    // Dispatch the account retrieval action when the component mounts
    dispatch(startGetUserAccount())
  }, [dispatch])

  console.log('User:', user)
  console.log('IsAuthenticated:', isAuthenticated)

  return (
    <div>
      <h2>Account Information</h2>
      { isAuthenticated ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Please log in to view your account information.</p>
      )}
    </div>
  )
} 

export default AccountInfo
