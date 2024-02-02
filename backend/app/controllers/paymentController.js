const Payment = require('../models/paymentModel')
const Slot = require('../models/slotModel')
const Doctor = require('../models/doctorModel')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const paymentCtlr = {}

paymentCtlr.checkout = async (req, res) => {
    try {
        const { doctorId, slotId } = req.body
        console.log(doctorId, 'doc', 'slot', slotId)
        const slot = await Slot.findOne({ _id: slotId })
        console.log('slot', slot)

        // if (!slot) {
        //     return res.status(404).json({ error: 'Slot not found' })
        // }

        const doctor = await Doctor.findOne({ userId: doctorId })
        console.log('doctor', doctor)

        // if (!doctor) {
        //     return res.status(404).json({ error: 'Doctor not found' })
        // }

        const consultationFee = doctor.consultationFee
        console.log('consultationfee', consultationFee)

        if (typeof consultationFee !== 'number' || consultationFee <= 0) {
            return res.status(400).json({ error: 'Invalid consultation fee' })
        }

        const payment = new Payment({
            doctor: doctorId,
            slot: slotId,
            modeOfPayment: 'stripe',
            status: 'pending',
            amount: consultationFee,
        })
        await payment.save()
        console.log('payment', payment)

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: `Payment for consultation with Dr. ${doctor.doctorName}`,
                        },
                        unit_amount: consultationFee * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: 'http://localhost:3000/payment/success',
            cancel_url: 'http://localhost:3000/payment/cancel'
        })
        console.log('session', session)

        payment.paymentId = session.id
        payment.status = 'pending'
        await payment.save()

        res.json({ url: session.url, consultationFee })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message })
    }
}

paymentCtlr.paymentStatus = async (req, res) => {
    const { sessionId } = req.body
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId)
      res.json({ status: session.payment_status })
    } catch (err) {
      res.status(500).json({ error: 'Payment status retrieval failed' })
    }
  }

paymentCtlr.paymentSuccess = async (req, res) => {
    try {
        const successMsg = 'Your payment towards consultation of a doctor is successfully done. Please wait for the doctor to confirm your appointment.'
        res.status(200).json({ success: true, message: successMsg })
    } catch(err) {
        res.status(500).json({ success: false, error: 'Payment processing failed' })
    }
}

module.exports = paymentCtlr
