import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import Cnavbar from './Cnavbar';
import Cfooter from './Cfooter';
import Ccarousel from './Ccarousal';
import axiosInstance from '../../axiosintercepter';

const Customer_home = () => {
  const [movies, setMovies] = useState([]);
  const [movies1, setMovies1] = useState([]);
  const navigate = useNavigate();

  // Navigate to movie_book page with selected movie ID
  const handleMovieClick = (id) => {
    navigate(`/movie_book/${id}`);
  };

  // Fetch movies from API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:5000/api/movies');
        const movieList = response.data;
        const firstSet = movieList.slice(0, 3); // First 3 movies
        const secondSet = movieList.slice(3); // Remaining movies
        setMovies(firstSet);    
        setMovies1(secondSet);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <>
      <Cnavbar />
      <div style={{ marginTop: '20%', padding: '0 10%' }}>
        <Ccarousel />
      </div>

      <div style={{ padding: '0 10%', marginTop: '30px' }}>
        <Typography variant="h4" gutterBottom style={{ marginBottom: "30px" }}>
          Latest Releases
        </Typography>
        <Grid container spacing={4}>
          {movies.map((movie, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card onClick={() => handleMovieClick(movie._id)} style={{ cursor: 'pointer' }}>
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
                  <Button variant="contained" color="primary" style={{ marginTop: '10px' }} onClick={() => handleMovieClick(movie._id)}>
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={4} style={{ marginTop: "2%" }}>
          {movies1.map((movie, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card onClick={() => handleMovieClick(movie._id)} style={{ cursor: 'pointer' }}>
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
                  <Button variant="contained" color="primary" style={{ marginTop: '10px' }} onClick={() => handleMovieClick(movie._id)}>
                    Book Now
                  </Button>
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

export default Customer_home;
