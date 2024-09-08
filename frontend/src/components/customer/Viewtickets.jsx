// src/components/ViewTickets.jsx

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardActions, Typography, Button, Grid, Box, CardMedia } from '@mui/material';
import axios from 'axios'; // Assuming you will fetch ticket data from an API
import Cnavbar from './Cnavbar';

function ViewTickets() {
  const [tickets, setTickets] = useState([]);

  // Dummy data for demonstration. Replace this with API call in real-world use case.
  const mockTickets = [
    {
      id: 1,
      movieName: 'Inception',
      category: 'Sci-Fi',
      language: 'English',
      imageUrl: 'https://via.placeholder.com/278x417', // Replace with actual movie image URL
    },
    {
      id: 2,
      movieName: 'Parasite',
      category: 'Thriller',
      language: 'Korean',
      imageUrl: 'https://via.placeholder.com/278x417', // Replace with actual movie image URL
    },
  ];

  useEffect(() => {
    // Replace with actual API call to fetch tickets
    // axios.get('/api/tickets')
    //   .then(response => setTickets(response.data))
    //   .catch(error => console.error(error));
    
    setTickets(mockTickets); // Using mock data here
  }, []);

  const handleCancel = (ticketId) => {
    // Replace with actual API call to cancel ticket
    console.log(`Cancel ticket with ID: ${ticketId}`);
    // Example:
    // axios.delete(`/api/tickets/${ticketId}`)
    //   .then(response => setTickets(tickets.filter(ticket => ticket.id !== ticketId)))
    //   .catch(error => console.error(error));
  };

  const handleRate = (ticketId) => {
    // Implement rating functionality here
    console.log(`Rate movie with ticket ID: ${ticketId}`);
  };

  return (
    <>
      <Cnavbar />
      <Box sx={{ padding: '80px 20px 20px', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          My Movie Tickets
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {tickets.map((ticket) => (
            <Grid item key={ticket.id}>
              <Card sx={{
                width: '278px',  // Set width to image width
                borderRadius: '15px', // Rounded corners
                overflow: 'hidden',
                boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3)',
                position: 'relative',
              }}>
                <CardMedia
                  component="img"
                  image={ticket.imageUrl}
                  alt={`${ticket.movieName} poster`}
                  sx={{
                    width: '278px',  // Set width to 278px
                    height: '417px', // Set height to 417px
                    objectFit: 'cover', // Ensures the image covers the specified area
                  }}
                />
                <CardContent
                  sx={{
                    backgroundColor: '#fff',
                    padding: '10px',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h6" component="div" gutterBottom>
                    {ticket.movieName}
                  </Typography>
                  <Typography color="text.secondary">
                    {ticket.category}
                  </Typography>
                  <Typography color="text.secondary">
                    {ticket.language}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between', // Ensure buttons are spaced apart
                    backgroundColor: '#f5f5f5',
                    padding: '10px',
                  }}
                >
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleCancel(ticket.id)}
                    sx={{
                      backgroundColor: '#ff4d4d',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: '#ff6666',
                      },
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleRate(ticket.id)}
                    sx={{
                      backgroundColor: '#2196f3',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: '#64b5f6',
                      },
                    }}
                  >
                    Rate
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default ViewTickets;
