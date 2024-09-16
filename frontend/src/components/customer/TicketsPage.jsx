import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import Cnavbar from './Cnavbar';
import Cfooter from './Cfooter';
import axiosInstance from '../../axiosintercepter';
import * as jwt_decode from 'jwt-decode';  // Corrected import

const TicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [movies, setMovies] = useState({});

  // Fetch user email from the token
  const getEmailFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwt_decode(token);
        return decoded.email;
      } catch (error) {
        console.error('Invalid token:', error);
        return null;
      }
    }
    return null;
  };

  const email = getEmailFromToken();

  // Fetch tickets and movies data
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        if (email) {
          // Fetch tickets for the user
          const response = await axiosInstance.get(`/api/tickets?email=${email}`);
          const ticketList = response.data;
          setTickets(ticketList);

          // Fetch movie details for each ticket
          const movieIds = ticketList.map(ticket => ticket.movie_id);
          if (movieIds.length > 0) {
            const movieResponse = await axiosInstance.post('/api/movies/getMoviesByIds', { movieIds });
            const movieData = movieResponse.data.reduce((acc, movie) => {
              acc[movie._id] = movie;
              return acc;
            }, {});
            setMovies(movieData);
          }
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };
    fetchTickets();
  }, [email]);

  // Cancel the ticket
  const handleCancelTicket = async (ticketId) => {
    try {
      await axiosInstance.delete(`/api/tickets/${ticketId}`);
      // Remove the ticket from the state
      setTickets(prevTickets => prevTickets.filter(ticket => ticket._id !== ticketId));
    } catch (error) {
      console.error('Error cancelling the ticket:', error);
    }
  };

  return (
    <>
      <Cnavbar />
      <div style={{ padding: '0 10%', marginTop: '30px' }}>
        <Typography variant="h4" gutterBottom style={{ marginBottom: '30px' }}>
          Your Booked Tickets
        </Typography>
        {tickets.length === 0 ? (
          <Typography variant="h6">No tickets booked.</Typography>
        ) : (
          <Grid container spacing={4}>
            {tickets.map((ticket, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    height="400"
                    image={movies[ticket.movie_id]?.image || 'https://via.placeholder.com/400'}
                    alt={movies[ticket.movie_id]?.movie_name || 'Movie Image'}
                  />
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {movies[ticket.movie_id]?.movie_name || 'Movie Name'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Category: {movies[ticket.movie_id]?.category || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Languages: {movies[ticket.movie_id]?.languages?.join(', ') || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Booking Date: {new Date(ticket.booking_date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Seat: {ticket.seat}
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
            ))}
          </Grid>
        )}
      </div>
      <Cfooter />
    </>
  );
};

export default TicketsPage;
