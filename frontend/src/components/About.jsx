import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';

const About = () => {
  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="md" sx={{ mt: 15, mb: 7 }}>
        <Typography variant="h4" gutterBottom align="center">
          About Us
        </Typography>
        <Typography variant="h6" gutterBottom>
          Welcome to Cinema Tickets
        </Typography>
        <Typography paragraph sx={{ textAlign: 'justify' }}>
          At Cinema Tickets, we are passionate about bringing you the best in entertainment. Our mission is to provide a diverse range of movies and shows that cater to all tastes and preferences. Whether you’re a fan of action-packed blockbusters or heartwarming dramas, we strive to offer something for everyone.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Our Mission
        </Typography>
        <Typography paragraph sx={{ textAlign: 'justify' }}>
          Our mission is to deliver high-quality entertainment experiences by offering a wide selection of films and shows that inspire, entertain, and captivate our audience. We are committed to excellent service and ensuring that every customer finds something they love.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Our History
        </Typography>
        <Typography paragraph sx={{ textAlign: 'justify' }}>
          Founded in 2018, Cinema Tickets started as a small company with a big dream. Over the years, we have grown into a leading provider of movie and entertainment content. Our journey has been marked by milestones and achievements that reflect our dedication to the industry and our customers.
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6">Our Values</Typography>
              <Typography paragraph sx={{ textAlign: 'justify' }}>
                Integrity, innovation, and customer satisfaction are at the core of our values. We believe in creating positive experiences and continuously improving our offerings.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6">Contact Us</Typography>
              <Typography paragraph sx={{ textAlign: 'justify',pb:3 }}>
                Have questions or feedback? We’d love to hear from you. Reach out to us at info@cinematickets.com or +1 (123) 456-7890.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default About;
