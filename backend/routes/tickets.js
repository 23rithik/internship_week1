const express = require('express');
const router = express.Router();
const Ticket = require('../model/Ticket');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  // Extract token from "Bearer <token>"
  
    if (!token) return res.sendStatus(401);  // No token found
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);  // Invalid token
      req.user = user;
      next();
    });
  };
  
  

router.post('/tickets', authenticateToken, async (req, res) => {
  const { movie_name, noOfSeats, totalPrice, category, language, seatNumber } = req.body;
  const email = req.user.email;

  try {
    const ticket = new Ticket({
      movie_name,
      noOfSeats,
      totalPrice,
      category,
      language,
      seatNumber,
      email
    });

    await ticket.save();

    // Send email confirmation
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Ticket Booking Confirmation',
      text: `Your ticket for movie "${movie_name}" has been booked successfully.\nSeat number: ${seatNumber}\nTotal Price: ${totalPrice}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).send('Error sending email');
      }
      res.status(200).send('Ticket booked and email sent');
    });
  } catch (error) {
    console.error('Error booking ticket:', error);
    res.status(500).send('Error booking ticket');
  }
});

module.exports = router;
