import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, CardMedia, Typography, Button, CircularProgress, Box } from '@mui/material';
import axiosInstance from '../../axiosintercepter';
import Cnavbar from './Cnavbar';
import Cfooter from './Cfooter';

const Movie_Book = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:5000/api/bookmovie/${id}`);
        setMovie(response.data);
        
        // Fetch reviews
        const reviewResponse = await axiosInstance.get(`http://localhost:5000/api/viewreview/${response.data.movie_name}`);
        const reviews = reviewResponse.data;

        // Calculate average rating
        if (reviews.length > 0) {
          const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
          const avgRating = totalRating / reviews.length;
          setAverageRating(avgRating);
        }

        setLoading(false);
      } catch (error) {
        setError('Error fetching movie details');
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <CircularProgress style={{ display: 'block', margin: 'auto' }} />;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>No movie found</div>;

  // Helper function to display stars based on rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - Math.ceil(rating);
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push('★'); // Full star
    }
    if (halfStar) {
      stars.push('☆'); // Half star
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push('☆'); // Empty star
    }
    return stars.join(' ');
  };

  return (
    <>
      <Cnavbar />
      <div style={{ padding: '2% 10%', marginTop: "7%", width: "99%", marginLeft: "-5%" }}>
        <Typography variant="h3" gutterBottom>
          {movie.movie_name}
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3.7}>
            <Card style={{ boxShadow: 'none', backgroundColor: 'transparent' }}>
              <CardMedia
                component="img"
                image={movie.image}
                alt={movie.movie_name}
                style={{ width: 278, height: 417, objectFit: 'cover' }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={7.3}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Description
                </Typography>
                <Typography variant="body1" paragraph>
                  {movie.description}
                </Typography>
                <Typography variant="h6" component="div">
                  Cast
                </Typography>
                <Typography variant="body1" paragraph>
                  {movie.cast}
                </Typography>
                {/* <Typography variant="h6" component="div">
                  Reviews
                </Typography> */}
                {/* <Box>
                  <Typography variant="body1" paragraph>
                    {renderStars(averageRating)} - Average Rating
                  </Typography>
                </Box> */}
                <Typography variant="h6" component="div">
                  Ticket Rate
                </Typography>
                <Typography variant="body1" paragraph>
                  {movie.ticket_rate}Rs.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '20px' }}
                  onClick={() => navigate(`/tickets/${id}`)} // Navigate to /tickets
                >
                  Book Ticket
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  style={{ marginTop: '20px', marginLeft: '10px' }}
                  onClick={() => navigate(`/listreview/${movie.movie_name}`)} // Navigate to /listreview
                >
                  View Reviews
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      <Cfooter />
    </>
  );
};

export default Movie_Book;
