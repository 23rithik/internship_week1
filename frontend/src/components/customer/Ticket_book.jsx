import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, CircularProgress, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axiosInstance from '../../axiosintercepter';
import Cnavbar from './Cnavbar';
import Cfooter from './Cfooter';

const TicketBook = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availability, setAvailability] = useState('Available');
  const [seatNumbers, setSeatNumbers] = useState([]);  // Array to store seat numbers
  const [noOfSeats, setNoOfSeats] = useState(1);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Function to generate unique seat numbers
  function generateUniqueSeatNumbers(count) {
    const newSeatNumbers = [];
    while (newSeatNumbers.length < count) {
      const seatNumber = Math.floor(Math.random() * 100) + 1;
      if (!newSeatNumbers.includes(seatNumber)) {
        newSeatNumbers.push(seatNumber);
      }
    }
    return newSeatNumbers;
  }

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axiosInstance.get(`internship-week1backend.vercel.app/api/bookmovie/${id}`);
        const movieData = response.data;

        // Set movie data
        setMovie(movieData);

        // Set availability based on no_of_seats
        if (movieData.no_of_seats == 0) {
          setAvailability('Housefull');
        } else if (movieData.no_of_seats > 60) {
          setAvailability('Available');
        } else {
          setAvailability('Fast Filling');
        }

        setLoading(false);
      } catch (error) {
        setError('Error fetching movie details');
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    if (noOfSeats > 0) {
      setSeatNumbers(generateUniqueSeatNumbers(noOfSeats));
    }
  }, [noOfSeats]);

  const handleBookTicket = async () => {
    if ((availability === 'Available' || availability === 'Fast Filling') && seatNumbers.length > 0) {
      try {
        const ticketRate = parseFloat(movie.ticket_rate);
        const totalPrice = noOfSeats * ticketRate;
        const bookingDate = new Date();  // Get the current date
  
        // POST request to store the booking details
        const response = await axiosInstance.post(
          `internship-week1backend.vercel.app/api/tickets`,
          {
            movie_name: movie.movie_name,
            noOfSeats,
            totalPrice,
            category: movie.category,
            language: movie.languages,
            seatNumbers,  // Pass seatNumbers here
            bookingDate  // Include the booking date here
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
  
        alert(`Tickets booked successfully! Seats: ${seatNumbers.join(', ')}. Confirmation email sent.`);
        setConfirmationMessage(`Tickets booked successfully! Seats: ${seatNumbers.join(', ')}. Confirmation email sent.`);
        setSeatNumbers(generateUniqueSeatNumbers(noOfSeats));  // Reset seat numbers for the next booking
        setNoOfSeats(1);
      } catch (error) {
        setError('Error booking ticket');
      }
    } else {
      setError('Please select the number of seats and ensure tickets are available.');
    }
  };
  

  
  if (loading) return <CircularProgress style={{ display: 'block', margin: 'auto' }} />;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>No movie found</div>;

  return (
    <>
      <Cnavbar />
      <div style={{ padding: '2% 10%', marginTop: '7%' }}>
        <Typography variant="h3" gutterBottom>
          {movie.movie_name}
        </Typography>
        <Card style={{ marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Ticket Availability
            </Typography>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel id="availability-label">Availability</InputLabel>
              <Select
                labelId="availability-label"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                label="Availability"
                disabled // Disable the dropdown as availability is calculated automatically
              >
                <MenuItem value="Available">Available</MenuItem>
                <MenuItem value="Fast Filling">Fast Filling</MenuItem>
                <MenuItem value="Housefull">Housefull</MenuItem>
              </Select>
            </FormControl>
            {(availability === 'Available' || availability === 'Fast Filling') && (
              <>
                <div style={{ marginBottom: '10px' }}>
                  <Typography variant="h6">Seat Numbers:</Typography>
                  <Typography variant="body1">{seatNumbers.join(', ')}</Typography>
                </div>
                <TextField
                  type="number"
                  label="Number of Seats"
                  value={noOfSeats}
                  onChange={(e) => setNoOfSeats(parseInt(e.target.value, 10) || 1)}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  inputProps={{ min: 1 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleBookTicket}
                  style={{ marginTop: '20px' }}
                  disabled={availability === 'Housefull'}  // Disable button if Housefull
                >
                  Book Ticket
                </Button>
              </>
            )}
            {availability === 'Housefull' && (
              <Typography variant="body1" color="error">
                No seats available. The show is Housefull.
              </Typography>
            )}
          </CardContent>
        </Card>
      </div>
      <Cfooter />
    </>
  );
};

export default TicketBook;
