import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import Cfooter from './Cfooter';
import Cnavbar from './Cnavbar';

const AddMovie = () => {
  const [movieName, setMovieName] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [languages, setLanguages] = useState('');
  const [description, setDescription] = useState('');
  const [cast, setCast] = useState('');
  const [ticketRate, setTicketRate] = useState('');
  const [noOfSeats, setNoOfSeats] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const newMovie = {
      movie_name: movieName,
      image,
      category,
      languages,
      description,
      cast,
      ticket_rate: ticketRate,
      no_of_seats: noOfSeats,
    };

    try {
      await axios.post('internship-week1backend.vercel.app/api/add_movie', newMovie);
      // Reset fields
      setMovieName('');
      setImage('');
      setCategory('');
      setLanguages('');
      setDescription('');
      setCast('');
      setTicketRate('');
      setNoOfSeats('');
      alert('Movie added successfully!');
      navigate('/admin_home');
    } catch (err) {
      setError('Error adding movie. Please try again.');
    }
  };

  return (
    <>
      <Cnavbar />
      <Container maxWidth="sm" style={{ marginTop: "9%" }}>
        <Typography variant="h4" gutterBottom>
          Add Movie
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px' }}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Movie Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
              required
            />
            <TextField
              label="Image URL"
              variant="outlined"
              fullWidth
              margin="normal"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
            <TextField
              label="Category"
              variant="outlined"
              fullWidth
              margin="normal"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
            <TextField
              label="Languages (comma-separated)"
              variant="outlined"
              fullWidth
              margin="normal"
              value={languages}
              onChange={(e) => setLanguages(e.target.value)}
              required
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <TextField
              label="Cast"
              variant="outlined"
              fullWidth
              margin="normal"
              value={cast}
              onChange={(e) => setCast(e.target.value)}
              required
            />
            <TextField
              label="Ticket Rate"
              variant="outlined"
              fullWidth
              margin="normal"
              value={ticketRate}
              onChange={(e) => setTicketRate(e.target.value)}
              required
            />
            <TextField
              label="Number of Seats"
              variant="outlined"
              fullWidth
              margin="normal"
              value={noOfSeats}
              onChange={(e) => setNoOfSeats(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Movie
            </Button>
          </form>
        </div>
      </Container>
      <Cfooter />
    </>
  );
};

export default AddMovie;
