import React, {useEffect} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Alert } from 'react-bootstrap'

const PaymentFailure = () => {
  console.log('ps')
  const history = useHistory()

  useEffect(() => {
    const redirectPayment = setTimeout(() => {
      history.push('/')
    }, 5000)
    return () => clearTimeout(redirectPayment)
  }, [history])

  return (
    <div>
      <Alert variant='danger'> Your Payment got failed due to unknown reasons please try again... </Alert>
    </div>
  )
}

export default PaymentFailure
