import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Grid, Snackbar, Alert, CircularProgress, Rating } from '@mui/material';
import axiosInstance from '../../axiosintercepter';
import Cnavbar from './Cnavbar';
import Cfooter from './Cfooter';

const Review = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        // Update API endpoint to fetch from tickets collection
        const response = await axiosInstance.get('http://localhost:5000/api/tickets');
        // Remove duplicate movie names
        const uniqueMovies = Array.from(
          new Map(response.data.map(movie => [movie.movie_name, movie])).values()
        );
        setMovies(uniqueMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Failed to load movies.');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosInstance.post('http://localhost:5000/api/reviews', {
        movie_name: selectedMovie,
        review,
        rating
      });
      setSnackbarMessage('Review submitted successfully.');
      setSnackbarOpen(true);
      setReview('');
      setRating(0);
    } catch (error) {
      console.error('Error submitting review:', error);
      setError('Failed to submit review.');
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Cnavbar />
      <Typography variant="h4" gutterBottom style={{ marginBottom: '10px', marginTop: "10%" }}>
        Write a Review
      </Typography>
      <div style={{ padding: '0 10%', marginTop: '50px', display: 'flex', justifyContent: 'center' }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '20px',
          maxWidth: '800px',
          width: '100%',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography variant="h6" color="error">{error}</Typography>
          ) : (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    value={selectedMovie}
                    onChange={(e) => setSelectedMovie(e.target.value)}
                    fullWidth
                    SelectProps={{
                      native: true,
                    }}
                    required
                  >
                    <option value="" disabled>Select a movie</option>
                    {movies.map((movie) => (
                      <option key={movie._id} value={movie.movie_name}>
                        {movie.movie_name}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Rating
                    value={rating}
                    onChange={(event, newValue) => setRating(newValue)}
                    precision={0.5}
                    size="large"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Your Review"
                    multiline
                    rows={4}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Submit Review
                  </Button>
                </Grid>
              </Grid>
            </form>
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
      </div>
      <Cfooter />
    </>
  );
};

export default Review;
