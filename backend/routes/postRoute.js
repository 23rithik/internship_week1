const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Userdata = require('../model/Userdata'); // Path to your Userdata model
const Login = require('../model/Login'); // Path to your Login model (new collection)
const Movie = require('../model/Movie');
const Review = require('../model/Review');
// const Movies = require('../model/Movie');


// Middleware to parse JSON
router.use(express.json());

// POST endpoint for user registration
router.post('/adduser', async (req, res) => {
    try {
        const { name, email, phone, location, password, cpassword } = req.body;

        // Validate password and confirm password match
        if (password !== cpassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        // Validate email uniqueness in Userdata collection
        const existingUser = await Userdata.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user in Userdata collection
        const newUser = new Userdata({
            name,
            email,
            phone,
            location,
            password: hashedPassword
        });

        // Save the user to Userdata collection
        const savedUser = await newUser.save();

        // Insert into the login collection
        const newLogin = new Login({
            email,
            password: hashedPassword // Store the hashed password
        });

        // Save the user to login collection
        await newLogin.save();

        // Respond with success
        res.status(201).json({ message: 'Registered Successfully', data: savedUser });
        console.log('User added to Userdata and Login collections:', savedUser);

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
});

// POST endpoint for login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email in the Login collection
        const user = await Login.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Compare the password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token with email included in the payload
        const token = jwt.sign(
            { userId: user._id, email: user.email },  // Include email in the payload
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


router.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find(); // Fetch all movies from the collection
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/bookmovie/:id', async (req, res) => {
    try {
      const movieId = req.params.id;
      const movie = await Movie.findById(movieId);
      
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
  
      res.json(movie);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

// DELETE endpoint to delete a movie by ID
router.delete('/movies/:id', async (req, res) => {
    try {
        const movieId = req.params.id;
        const deletedMovie = await Movie.findByIdAndDelete(movieId);

        if (!deletedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json({ message: 'Movie deleted successfully', deletedMovie });
    } catch (error) {
        console.error('Error deleting movie:', error);
        res.status(500).json({ message: 'Server error' });
    }
});





// GET /api/avgrating - Fetch all movies with average ratings
router.get('/avgrating', async (req, res) => {
    try {
        // Fetch all movies
        const movies = await Movie.find();

        // Fetch and calculate the average rating for each movie based on movie_name
        const moviesWithRatings = await Promise.all(movies.map(async (movie) => {
            const reviews = await Review.find({ movie_name: movie.movie_name });

            let averageRating = 'N/A';

            if (reviews.length > 0) {
                const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
                averageRating = (totalRating / reviews.length).toFixed(1);
                 // Calculate average rating
            }

            return {
                ...movie.toObject(),
                averageRating, // Attach the average rating to each movie
            };
        }));
        
        res.status(200).json(moviesWithRatings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch movies' });
    }
});

// GET /api/reviews1/:movie_name - Fetch reviews for a specific movie by name
router.get('/reviews1/:movie_name', async (req, res) => {
    const { movie_name } = req.params;

    try {
        const reviews = await Review.find({ movie_name });
        res.status(200).json(reviews);
        console.log(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch reviews' });
    }
});



// Get movie details by movie name
router.get('/get_movies/:movie_name', async (req, res) => {
    try {
      const movie = await Movie.findOne({ movie_name: req.params.movie_name });
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      res.json(movie);
    } catch (error) {
      console.error('Error fetching movie:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Update movie details
  router.put('/edit_movies/:movie_name', async (req, res) => {
    try {
      const updatedMovie = await Movie.findOneAndUpdate(
        { movie_name: req.params.movie_name },
        req.body,
        { new: true }
      );
  
      if (!updatedMovie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
  
      res.json(updatedMovie);
    } catch (error) {
      console.error('Error updating movie:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });


  // POST endpoint to add a movie
router.post('/add_movie', async (req, res) => {
    try {
        const { movie_name, image, category, languages, description, cast, ticket_rate, no_of_seats } = req.body;

        // Validate required fields
        if (!movie_name || !image || !category || !languages || !description || !cast || !ticket_rate || !no_of_seats) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create new movie object
        const newMovie = new Movie({
            movie_name,
            image,
            category,
            languages,
            description,
            cast,
            ticket_rate,
            no_of_seats,
        });

        // Save the new movie to the database
        const savedMovie = await newMovie.save();

        // Respond with the saved movie
        res.status(201).json({ message: 'Movie added successfully', data: savedMovie });
    } catch (error) {
        console.error('Error adding movie:', error);
        res.status(500).json({ error: 'Error adding movie' });
    }
});

module.exports = router;
