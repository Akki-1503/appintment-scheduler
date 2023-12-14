// const Payment = require('../models/paymentModel');
// const Slot = require('../models/slotModel');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// const paymentCtlr = {};

// paymentCtlr.checkout = async (req, res) => {
//     try {
//         const { doctorId, slotId } = req.body;
//         const slot = await Slot.findOne({ _id: slotId })
//         console.log('slot', slot)
        
//         if (!slot) {
//             return res.status(404).json({ error: 'Slot not found' });
//         }

//         const doctor = slot.doctor;
//         console.log('doctor', doctor)

//         if (!doctor) {
//             return res.status(404).json({ error: 'Doctor not found for the slot' });
//         }

//         const consultationFee = doctor && doctor.consultationFee;
//         console.log('consultationFee', consultationFee)

//         if (typeof consultationFee !== 'number' || consultationFee <= 0) {
//             return res.status(400).json({ error: 'Invalid consultation fee' });
//         }

//         const payment = new Payment({
//             doctor: doctorId,
//             slot: slotId,
//             modeOfPayment: 'stripe',
//             status: 'pending',
//             amount: consultationFee,
//         });
//         await payment.save();

//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: consultationFee * 100, // Amount in cents
//             currency: 'INR',
//             description: `Payment for consultation with Dr. ${doctor.doctorName}`,
//         });

//         payment.paymentId = paymentIntent.id;
//         payment.status = paymentIntent.status;
//         await payment.save();
        
//         res.json({ orderId: paymentIntent.id });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: err.message });
//     }
// };

// module.exports = paymentCtlr;








// const Payment = require('../models/paymentModel');
// const Slot = require('../models/slotModel');
// const Doctor = require('../models/doctorModel'); // Import the Doctor model
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// const paymentCtlr = {};

// paymentCtlr.checkout = async (req, res) => {
//     try {
//         const { doctorId, slotId } = req.body;
//         const slot = await Slot.findOne({ _id: slotId });
//         console.log('slot', slot)

//         if (!slot) {
//             return res.status(404).json({ error: 'Slot not found' });
//         }

//         // Fetch the doctor's consultationFee based on the provided doctorId
//         const doctor = await Doctor.findOne({ _id: doctorId });
//         console.log('doctor', doctor)

//         if (!doctor) {
//             return res.status(404).json({ error: 'Doctor not found' });
//         }

//         const consultationFee = doctor.consultationFee;
//         console.log('consultationfee', consultationFee)

//         if (typeof consultationFee !== 'number' || consultationFee <= 0) {
//             return res.status(400).json({ error: 'Invalid consultation fee' });
//         }

//         const payment = new Payment({
//             doctor: doctorId,
//             slot: slotId,
//             modeOfPayment: 'stripe',
//             payment_method:["card"],
//             status: 'pending',
//             amount: consultationFee,
//         });
//         await payment.save();
//         console.log(payment, 'payment')

//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: consultationFee,
//             currency: 'INR',
//             description: `Payment for consultation with Dr. ${doctor.doctorName}`,
//         });
//         console.log('paymentIntent', paymentIntent)

//         payment.paymentId = paymentIntent.id;
//         payment.status = paymentIntent.status;
//         await payment.save();

//         console.log('paymentId', paymentIntent.id)

//         res.json({ orderId: paymentIntent.id });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: err.message });
//     }
// };

// module.exports = paymentCtlr;




// const Payment = require('../models/paymentModel');
// const Slot = require('../models/slotModel');
// const Doctor = require('../models/doctorModel');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// const paymentCtlr = {};

// paymentCtlr.checkout = async (req, res) => {
//     try {
//         const { doctorId, slotId } = req.body;
//         const slot = await Slot.findOne({ _id: slotId });
//         console.log('slot', slot)

//         if (!slot) {
//             return res.status(404).json({ error: 'Slot not found' });
//         }

//         const doctor = await Doctor.findOne({ _id: doctorId });
//         console.log('doctor', doctor)

//         if (!doctor) {
//             return res.status(404).json({ error: 'Doctor not found' });
//         }

//         const consultationFee = doctor.consultationFee;
//         console.log('consultationfee', consultationFee)

//         if (typeof consultationFee !== 'number' || consultationFee <= 0) {
//             return res.status(400).json({ error: 'Invalid consultation fee' });
//         }

//         const payment = new Payment({
//             doctor: doctorId,
//             slot: slotId,
//             mode: 'payment', // Updated mode
//             status: 'success', // Updated status
//             amount: consultationFee,
//         });
//         await payment.save();
//         console.log('payment', payment)

//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: consultationFee * 100,
//             currency: 'inr',
//             payment_method_types: ["card"],
//             description: `Payment for consultation with Dr. ${doctor.doctorName}`,
//         });
//         console.log('paymentIntent', paymentIntent)

//         payment.paymentId = paymentIntent.id;
//         payment.status = paymentIntent.status;
//         console.log('paymentstatus', payment.status)
//         console.log('paymentin', payment.paymentId)
//         await payment.save();

//         res.json({ orderId: paymentIntent.id });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: err.message });
//     }
// };

// module.exports = paymentCtlr;












const Payment = require('../models/paymentModel');
const Slot = require('../models/slotModel');
const Doctor = require('../models/doctorModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const paymentCtlr = {};

paymentCtlr.checkout = async (req, res) => {
    try {
        const { doctorId, slotId } = req.body;
        const slot = await Slot.findOne({ _id: slotId });
        console.log('slot', slot)

        if (!slot) {
            return res.status(404).json({ error: 'Slot not found' });
        }

        const doctor = await Doctor.findOne({ _id: doctorId });
        console.log('doctor', doctor)

        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        const consultationFee = doctor.consultationFee;
        console.log('consultationfee', consultationFee)

        if (typeof consultationFee !== 'number' || consultationFee <= 0) {
            return res.status(400).json({ error: 'Invalid consultation fee' });
        }

        const payment = new Payment({
            doctor: doctorId,
            slot: slotId,
            modeOfPayment: 'stripe',
            status: 'pending',
            amount: consultationFee,
        });
        await payment.save();
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
            success_url: 'https://your-success-url.com', // Replace with your actual success URL
            cancel_url: 'https://your-cancel-url.com', // Replace with your actual cancel URL
        });
        console.log('session', session)

        payment.paymentId = session.id;
        payment.status = 'pending';
        await payment.save();

        res.json({ url: session.url, consultationFee });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

paymentCtlr.paymentStatus = async (req, res) => {
    const {sessionId} = req.body
    console.log('sessionid', sessionId)
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId)
        console.log('session', session)
        res.json({status: session.payment_status})
    } catch(err) {
        res.status(500).json({err: 'payment status retrieval failed'})
    }
}

module.exports = paymentCtlr;











// const Payment = require('../models/paymentModel');
// const Slot = require('../models/slotModel');
// const Doctor = require('../models/doctorModel');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// const paymentCtlr = {};

// paymentCtlr.checkout = async (req, res) => {
//     try {
//         const { userId, slotId } = req.body; // Changed from doctorId to userId
//         const slot = await Slot.findOne({ _id: slotId });

//         if (!slot) {
//             return res.status(404).json({ error: 'Slot not found' });
//         }

//         const doctor = await Doctor.findOne({ user: req.user.id }); // Fetch doctor using userId

//         if (!doctor) {
//             return res.status(404).json({ error: 'Doctor not found' });
//         }

//         const consultationFee = doctor.consultationFee;

//         if (typeof consultationFee !== 'number' || consultationFee <= 0) {
//             return res.status(400).json({ error: 'Invalid consultation fee' });
//         }

//         const payment = new Payment({
//             doctor: doctor._id,
//             slot: slotId,
//             modeOfPayment: 'stripe',
//             status: 'pending',
//             amount: consultationFee,
//         });
//         await payment.save();

//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             line_items: [
//                 {
//                     price_data: {
//                         currency: "inr",
//                         product_data: {
//                             name: `Payment for consultation with Dr. ${doctor.doctorName}`,
//                         },
//                         unit_amount: consultationFee * 100,
//                     },
//                     quantity: 1,
//                 },
//             ],
//             mode: "payment",
//             success_url: 'https://your-success-url.com',
//             cancel_url: 'https://your-cancel-url.com',
//         });

//         payment.paymentId = session.id;
//         payment.status = 'pending';
//         await payment.save();

//         res.json({ paymentUrl: session.url, consultationFee });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: err.message });
//     }
// };

// paymentCtlr.paymentStatus = async (req, res) => {
//     const { sessionId } = req.body;
//     try {
//         const session = await stripe.checkout.sessions.retrieve(sessionId);
//         res.json({ status: session.payment_status });
//     } catch (err) {
//         res.status(500).json({ error: 'payment status retrieval failed' });
//     }
// };

// module.exports = paymentCtlr;
