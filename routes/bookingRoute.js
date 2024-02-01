const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel.js");
const Car = require("../models/carModel.js");
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')("sk_test_51OPI1wSF9laeRyYR2vix9WTprebf4dZHIbJGtQUnMc7mhiRo2O0wx27oId9R9z8VZKulQznqLEaBMNNK7ifryu9n00wfPxglyP")
router.post("/bookcar", async (req, res) => {
    const { token } = req.body;
    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
        const payment = await stripe.paymentIntents.create({
            amount: req.body.totalAmount * 100,
            currency: 'inr',
            customer: customer.id,
            receipt_email: token.email
        }, {
            idempotencyKey: uuidv4()
        })

        if (payment){
            req.body.transactionId=customer.default_source;
            const newbooking = new Booking(req.body);
            await newbooking.save();
            const car = await Car.findOne({ _id: req.body.car });//to push in carroute bookedTimeSlots Array
            car.bookedTimeSlots.push(req.body.bookedTimeSlots);
            await car.save();
            res.send("Your booking is successfully")
        }
        else {
            return res.status(400).json(error);

        }

    }
    catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }

});

router.get("/getallbookings", async(req,res)=>{
    try {
        const bookings=await Booking.find().populate('car');
        res.send(bookings)
    } catch (error) {
        return res.status(400).json(error);

    }
})







module.exports = router;