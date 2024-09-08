const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Userdata = require('../model/Userdata'); // Path to your Userdata model
const Login = require('../model/Login'); // Path to your Login model (new collection)
const Movie = require('../model/Movie');
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


module.exports = router;
