import React, {useEffect} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Alert } from 'react-bootstrap'

const PaymentSuccess = () => {
  console.log('ps')
  const history = useHistory()

  useEffect(() => {
    const redirectHome = setTimeout(() => {
      history.push('/')
    }, 5000)
    return () => clearTimeout(redirectHome)
  }, [history])

  return (
    <div>
      <h2>Payment Successful!</h2>
      <Alert variant='success'>Your payment was successful. Thank you! Kindly please wait for the doctor confirmation. </Alert>
    </div>
  )
}

export default PaymentSuccess
