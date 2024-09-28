const express = require('express');
const router = express.Router();
const Ticket = require('../model/Ticket');
const Movie = require('../model/Movie');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const User = require('../model/Userdata');
const Review = require('../model/Review');  // Import the Review model


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

// router.post('/tickets', authenticateToken, async (req, res) => {
//   const { movie_name, noOfSeats, totalPrice, category, language, seatNumbers } = req.body; // Changed from seatNumber to seatNumbers
//   const email = req.user.email;

//   try {
//     // Fetch the movie by name to check seat availability
//     const movie = await Movie.findOne({ movie_name });

//     if (!movie) {
//       return res.status(404).json({ message: 'Movie not found' });
//     }

//     const availableSeats = parseInt(movie.no_of_seats);

//     // Check if there are enough available seats
//     if (availableSeats < noOfSeats) {
//       return res.status(400).json({ message: 'Not enough seats available' });
//     }

//     // Create a new ticket document
//     const ticket = new Ticket({
//       movie_name,
//       noOfSeats,
//       totalPrice,
//       category,
//       language,
//       seatNumbers,  // Store seatNumbers in the ticket
//       email
//     });

//     console.log(seatNumbers);
//     // Save the ticket to the database
//     await ticket.save();

//     // Deduct the number of booked seats from the available seats in the movie collection
//     movie.no_of_seats = (availableSeats - noOfSeats).toString();
//     await movie.save();  // Save the updated movie seat count

//     // Send email confirmation
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//       }
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'Ticket Booking Confirmation',
//       text: `Your ticket for movie "${movie_name}" has been booked successfully.\nSeats: ${seatNumbers.join(', ')}\nTotal Price: ${totalPrice}` // Include seatNumbers here
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Error sending email:', error);
//         return res.status(500).send('Error sending email');
//       }
//       res.status(200).json({ message: 'Ticket booked and email sent' });
//     });
//   } catch (error) {
//     console.error('Error booking ticket:', error);
//     res.status(500).send('Error booking ticket');
//   }
// });



router.post('/tickets', authenticateToken, async (req, res) => {
  const { movie_name, noOfSeats, totalPrice, category, language, seatNumbers } = req.body; // Changed from seatNumber to seatNumbers
  const email = req.user.email;

  try {
    // Fetch the movie by name to check seat availability
    const movie = await Movie.findOne({ movie_name });

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const availableSeats = parseInt(movie.no_of_seats);

    // Check if there are enough available seats
    if (availableSeats < noOfSeats) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    // Create a new ticket document
    const ticket = new Ticket({
      movie_name,
      noOfSeats,
      totalPrice,
      category,
      language,
      seatNumbers,  // Store seatNumbers in the ticket
      email,
      bookingDate: new Date() // Set the current booking date
    });

    console.log(seatNumbers);
    // Save the ticket to the database
    await ticket.save();

    // Deduct the number of booked seats from the available seats in the movie collection
    movie.no_of_seats = (availableSeats - noOfSeats).toString();
    await movie.save();  // Save the updated movie seat count

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
      text: `Your ticket for movie "${movie_name}" has been booked successfully.\nSeats: ${seatNumbers.join(', ')}\nTotal Price: ${totalPrice}\nBooking Date: ${ticket.bookingDate}` // Include booking date here
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).send('Error sending email');
      }
      res.status(200).json({ message: 'Ticket booked and email sent', bookingDate: ticket.bookingDate });
    });
  } catch (error) {
    console.error('Error booking ticket:', error);
    res.status(500).send('Error booking ticket');
  }
});


router.delete('/tickets/:ticketId', authenticateToken, async (req, res) => {
  const { ticketId } = req.params;
  const email = req.user.email;

  try {
    // Find the ticket by ID
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Ensure the ticket belongs to the user making the request
    if (ticket.email !== email) {
      return res.status(403).json({ message: 'Unauthorized to delete this ticket' });
    }

    // Fetch the movie associated with the ticket
    const movie = await Movie.findOne({ movie_name: ticket.movie_name });

    if (movie) {
      // Restore the available seats
      movie.no_of_seats = (parseInt(movie.no_of_seats) + ticket.noOfSeats).toString();
      await movie.save();
    }

    // Delete the ticket
    await Ticket.findByIdAndDelete(ticketId);

    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    res.status(500).send('Error deleting ticket');
  }
});

// Route to get all tickets for the authenticated user
router.get('/tickets', authenticateToken, async (req, res) => {
  const email = req.user.email;

  try {
    const tickets = await Ticket.find({ email });

    if (!tickets.length) {
      return res.status(404).json({ message: 'No tickets found' });
    }

    res.status(200).json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).send('Error fetching tickets');
  }
});

// Route to view movies (could be used for other functionalities)
router.post('/view-movies', authenticateToken, async (req, res) => {
  const { movieIds } = req.body;

  try {
    const movies = await Movie.find({ _id: { $in: movieIds } });
    res.status(200).json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).send('Error fetching movies');
  }
});


// Route to create a review
router.post('/reviews', authenticateToken, async (req, res) => {
  const { movie_name, review, rating } = req.body;
  const email = req.user.email;

  try {
    // Create a new review document
    const newReview = new Review({
      movie_name,
      review,
      rating,
      email
    });

    // Save the review to the database
    await newReview.save();

    res.status(201).json({ message: 'Review created successfully', review: newReview });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).send('Error creating review');
  }
});

// Route to get all reviews for a specific movie
router.get('/reviews/:movie_name', async (req, res) => {
  const { movie_name } = req.params;

  try {
    const reviews = await Review.find({ movie_name });

    if (!reviews.length) {
      return res.status(404).json({ message: 'No reviews found for this movie' });
    }

    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).send('Error fetching reviews');
  }
});

// Route to update a review
router.put('/reviews/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { review, rating } = req.body;
  const email = req.user.email;

  try {
    const updatedReview = await Review.findById(id);

    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Ensure the review belongs to the user making the request
    if (updatedReview.email !== email) {
      return res.status(403).json({ message: 'Unauthorized to update this review' });
    }

    updatedReview.review = review || updatedReview.review;
    updatedReview.rating = rating || updatedReview.rating;

    await updatedReview.save();

    res.status(200).json({ message: 'Review updated successfully', review: updatedReview });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).send('Error updating review');
  }
});

// Route to delete a review
router.delete('/reviews/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const email = req.user.email;

  try {
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Ensure the review belongs to the user making the request
    if (review.email !== email) {
      return res.status(403).json({ message: 'Unauthorized to delete this review' });
    }

    await Review.findByIdAndDelete(id);

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).send('Error deleting review');
  }
});


// Route to get all reviews for a specific movie by movie_name
router.get('/viewreview/:movie_name', async (req, res) => {
  const { movie_name } = req.params;

  try {
    // Fetch reviews for the specified movie_name
    const reviews = await Review.find({ movie_name });

    if (!reviews.length) {
      return res.status(404).json({ message: 'No reviews found for this movie' });
    }

    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).send('Error fetching reviews');
  }
});

router.get('/viewreviews/:movieName', async (req, res) => {
  try {
    const movieName = req.params.movieName;

    // Find reviews by movie name and populate the user's name based on the email
    const reviews = await Review.find({ movieName })
    
      .populate({
        path: 'user', // Assuming you have a reference to the User model
        select: 'name email', // Select name and email from the User model
        match: { email: { $exists: true } }, // Ensure the email field exists
      });

      
      console.log(reviews);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews' });
  }
});




// Get number of tickets sold per day according to movie_name
router.get('/perday/tickets/sold', async (req, res) => {
  try {
    const ticketsSoldPerDay = await Ticket.aggregate([
      {
        $group: {
          _id: {
            movie_name: "$movie_name", // Group by movie_name
            date: { $dateToString: { format: "%Y-%m-%d", date: "$bookingDate" } } // Group by date
          },
          totalTickets: { $sum: "$noOfSeats" }, // Sum the number of seats sold
        },
      },
      {
        $project: {
          movie_name: "$_id.movie_name",
          date: "$_id.date",
          totalTickets: 1,
          _id: 0,
        },
      },
      {
        $sort: { date: 1, movie_name: 1 }, // Sort by date and movie_name
      },
    ]);

    res.json(ticketsSoldPerDay);
  } catch (error) {
    console.error('Error fetching tickets sold per day:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
