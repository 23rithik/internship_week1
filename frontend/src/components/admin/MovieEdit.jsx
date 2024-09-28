import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosintercepter';
import { TextField, Button, Typography } from '@mui/material';
import Cnavbar from './Cnavbar';
import Cfooter from './Cfooter';

const MovieEdit = () => {
  const { movie_name } = useParams(); // Get the movie name from the URL
  const [movieData, setMovieData] = useState({
    movie_name: '',
    image: '',
    category: '',
    languages: '',
    description: '',
    cast: '',
    ticket_rate: '',
    no_of_seats: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:5000/api/get_movies/${movie_name}`); // Changed API to get_movies
        setMovieData(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movie_name]);

  const handleSave = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      await axiosInstance.put(`http://localhost:5000/api/edit_movies/${movie_name}`, movieData); // Updated API endpoint
      alert('Movie updated successfully!');
      navigate('/admin_home'); // Navigate back to the Admin home or another page
    } catch (error) {
      console.error('Error updating movie:', error);
      alert('Failed to update movie.');
    }
  };

  return (
    <>
      <Cnavbar />
      <div style={{ padding: '20px', marginTop: "9%" }}>
        <Typography variant="h4" style={{ marginBottom: "3%" }}>Edit Movie: {movie_name}</Typography>
        <div style={{
          backgroundColor: '#f0f0f0', // Light gray background
          padding: '20px', // Padding inside the form
          borderRadius: '8px', // Rounded corners
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Shadow effect
        }}>
          <form noValidate autoComplete="off" onSubmit={handleSave}>
            <TextField
              label="Movie Name"
              value={movieData.movie_name}
              onChange={(e) => setMovieData({ ...movieData, movie_name: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Image URL"
              value={movieData.image}
              onChange={(e) => setMovieData({ ...movieData, image: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Category"
              value={movieData.category}
              onChange={(e) => setMovieData({ ...movieData, category: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Languages"
              value={movieData.languages}
              onChange={(e) => setMovieData({ ...movieData, languages: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              value={movieData.description}
              onChange={(e) => setMovieData({ ...movieData, description: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Cast"
              value={movieData.cast}
              onChange={(e) => setMovieData({ ...movieData, cast: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Ticket Rate"
              value={movieData.ticket_rate}
              onChange={(e) => setMovieData({ ...movieData, ticket_rate: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Number of Seats"
              value={movieData.no_of_seats}
              onChange={(e) => setMovieData({ ...movieData, no_of_seats: e.target.value })}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" type="submit" style={{ marginTop: "2%" }}>
              Save Changes
            </Button>
          </form>
        </div>
      </div>
      <Cfooter />
    </>
  );
};

export default MovieEdit;
