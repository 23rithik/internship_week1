const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  movie_name: { type: String, required: true },
  noOfSeats: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  category: { type: String, required: true },
  language: { type: String, required: true },
  seatNumbers: [{ type: Number, required: true }], // Changed to an array of numbers
  email: { type: String, required: true }
});

module.exports = mongoose.model('Ticket', TicketSchema);
