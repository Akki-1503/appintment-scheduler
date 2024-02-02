import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Home = (props) => {
  return (
    <Container>
      <Row>
        <Col>
          <h2>Home</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <img src="https://cdn3.vectorstock.com/i/1000x1000/09/62/people-wait-in-hospital-appointment-queue-vector-36740962.jpg" alt="Banner" style={{ width: '100%', marginTop: '20px' }} />
        </Col>
      </Row>
    </Container>
  )
}

export default Home
