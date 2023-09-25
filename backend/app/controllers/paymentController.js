const Payment = require('../models/paymentModel')
const Razorpay = require('razorpay')
const crypto = require('crypto')

const paymentCtlr = {}

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY
})

paymentCtlr.createPayment = async(req, res) => {
    try{
        const {patientId, appointmentId, amount, modeOfPayment} = req.body

        const order = await razorpay.orders.create({
            amount: amount*100,
            currency: 'INR',
            receipt: `payment _${Date.now()}` 
        })
        const payment = new Payment({
            patient: patientId,
            appointment: appointmentId,
            amount,
            modeOfPayment,
            status: 'pending',
            razorpayOrderId: order.id 
        })
        await payment.save()
        res.json({orderId: order.id})
    }catch(err) {
        console.error('error creating payment:', err)
        res.json(err)
    }
}

paymentCtlr.paymentConfirmation = async(req, res) => {
    try{
        const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body
        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_KEY)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex')
        if(expectedSignature !== razorpay_signature) {
            return res.status(400).json({error: 'invalid signature'})
        }
        const payment = await Payment.findOne({razorPayId: razorpay_order_id})
        if(!payment) {
            return res.status(404).json({error: 'payment not found'})
        }
        payment.status = 'success'
        await payment.save()
    }catch(err) {
        console.error('error confirming payment:', err)
        res.status(404).json({error: err.message})
    }
}

module.exports = paymentCtlr