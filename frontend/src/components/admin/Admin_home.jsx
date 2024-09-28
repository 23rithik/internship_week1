import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import Cnavbar from './Cnavbar';
import Cfooter from './Cfooter';
import axiosInstance from '../../axiosintercepter';

const Admin_home = () => {
  const [movies, setMovies] = useState([]);
  const [averageRatings, setAverageRatings] = useState({});
  const [ticketsSoldPerDay, setTicketsSoldPerDay] = useState([]);
  const navigate = useNavigate();

  const handleEditMovie = (movie_name) => {
    navigate(`/edit_movie/${movie_name}`);
  };

  const handleDeleteMovie = async (movie_name) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        await axiosInstance.delete(`http://localhost:5000/api/movies/${movie_name}`);
        alert('Movie deleted successfully!');
        setMovies(movies.filter(movie => movie.movie_name !== movie_name));
      } catch (error) {
        console.error('Error deleting movie:', error);
        alert('Failed to delete the movie.');
      }
    }
  };

  const fetchAverageRatings = async (movie_name) => {
    try {
      const response = await axiosInstance.get(`http://localhost:5000/api/reviews1/${movie_name}`);
      const reviews = response.data;

      if (reviews.length > 0) {
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviews.length;
        setAverageRatings(prev => ({ ...prev, [movie_name]: averageRating.toFixed(1) }));
      } else {
        setAverageRatings(prev => ({ ...prev, [movie_name]: 'N/A' }));
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setAverageRatings(prev => ({ ...prev, [movie_name]: 'N/A' }));
    }
  };

  const fetchTicketsSoldPerDay = async () => {
    try {
      const response = await axiosInstance.get('http://localhost:5000/api/perday/tickets/sold');
      setTicketsSoldPerDay(response.data);
    } catch (error) {
      console.error('Error fetching tickets sold per day:', error);
    }
  };

  const fetchMovies = async () => {
    try {
      const response = await axiosInstance.get('http://localhost:5000/api/movies');
      const movieList = response.data;
      setMovies(movieList);

      movieList.forEach(movie => fetchAverageRatings(movie.movie_name));
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchTicketsSoldPerDay();
  }, []);

  return (
    <>
      <Cnavbar />
      <div style={{ padding: '0 10%', marginTop: '30px' }}>
        <Typography variant="h4" gutterBottom style={{ marginBottom: "30px" }}>
          Latest Releases
        </Typography>
        <Grid container spacing={4}>
          {movies.map((movie, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card style={{ cursor: 'pointer' }}>
                <CardMedia
                  component="img"
                  height="400"
                  image={movie.image}
                  alt={movie.movie_name}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {movie.movie_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Category: {movie.category}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Languages: {movie.languages}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Average Rating: {averageRatings[movie.movie_name] || 'Loading...'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tickets Sold Today: {ticketsSoldPerDay.length > 0 ? 
                      (ticketsSoldPerDay.find(ticket => ticket.movie_name === movie.movie_name && ticket.date === new Date().toISOString().split('T')[0])?.totalTickets || 0) : 'Loading...'}
                  </Typography>
                  <div style={{ marginTop: '10px' }}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      style={{ marginRight: '10px' }} 
                      onClick={() => handleEditMovie(movie.movie_name)}>
                      Edit
                    </Button>
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      onClick={() => handleDeleteMovie(movie.movie_name)}>
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <Cfooter />
    </>
  );
};

export default Admin_home;
