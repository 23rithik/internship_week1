// Contact.jsx
import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';
import mapImage from '../images/map.png'; // Adjust the path as necessary

const Contact = () => {
  const handleMapClick = () => {
    window.open('https://www.google.com/maps?q=37.7749,-122.4194', '_blank'); // Coordinates for a dummy location (San Francisco)
  };

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="md" sx={{ mt: 10, mb: 7 }}>
        <Typography variant="h4" gutterBottom align="center">
          Contact Us
        </Typography>
        <Typography variant="h6" gutterBottom>
          We’d Love to Hear From You!
        </Typography>
        <Typography paragraph>
          If you have any questions, feedback, or just want to say hello, feel free to reach out to us. We are here to help and look forward to hearing from you.
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" style={{paddingBottom:"5%"}}>Our Address</Typography>
              <Typography paragraph style={{paddingBottom:"46%"}}>
                1234 Example Street, Suite 567<br />
                San Francisco, CA 94103<br />
                Email: contact@example.com<br />
                Phone: (123) 456-7890
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6">Find Us on the Map</Typography>
              <div
                style={{
                  cursor: 'pointer',
                  height: '300px',
                  background: `url(${mapImage}) no-repeat center center`,
                  backgroundSize: 'cover',
                }}
                onClick={handleMapClick}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Contact;
