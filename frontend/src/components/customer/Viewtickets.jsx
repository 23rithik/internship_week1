import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, CircularProgress, Snackbar, Alert } from '@mui/material';
import Cnavbar from './Cnavbar';
import Cfooter from './Cfooter';
import axiosInstance from '../../axiosintercepter';

const ViewTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('http://localhost:5000/api/tickets');
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        if (error.response?.status === 403) {
          setError('Access denied. You do not have permission to view this resource.');
        } else {
          setError('Failed to load tickets.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:5000/api/movies');
        const movieList = response.data;
        const movieMap = movieList.reduce((acc, movie) => {
          acc[movie.movie_name] = movie;
          return acc;
        }, {});
        setMovies(movieMap);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);

  const handleCancelTicket = async (ticketId) => {
    try {
      await axiosInstance.delete(`/api/tickets/${ticketId}`);
      setTickets(prevTickets => prevTickets.filter(ticket => ticket._id !== ticketId));
      setSnackbarMessage('Ticket cancelled successfully.');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error cancelling the ticket:', error);
      setError('Failed to cancel the ticket.');
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Cnavbar />
      <div style={{ padding: '0 10%', marginTop: '30px' }}>
        <Typography variant="h4" gutterBottom style={{ marginBottom: '30px', marginTop: "10%" }}>
          Your Booked Tickets
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography variant="h6" color="error">{error}</Typography>
        ) : tickets.length === 0 ? (
          <Typography variant="h6">No tickets booked.</Typography>
        ) : (
          <Grid container spacing={4}>
            {tickets.map(ticket => {
              const movie = movies[ticket.movie_name] || {};
              return (
                <Grid item xs={12} sm={6} md={4} key={ticket._id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="400"
                      image={movie.image || 'https://via.placeholder.com/400'}
                      alt={ticket.movie_name || 'Movie Image'}
                    />
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {ticket.movie_name || 'Movie Name'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Category: {ticket.category || 'N/A'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Languages: {ticket.language || 'N/A'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Seat: {ticket.seatNumbers.join(', ')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total price: ₹{ticket.totalPrice || 'N/A'}
                      </Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginTop: '10px' }}
                        onClick={() => handleCancelTicket(ticket._id)}
                      >
                        Cancel Ticket
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="success">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
      <Cfooter />
    </>
  );
};

export default ViewTickets;
