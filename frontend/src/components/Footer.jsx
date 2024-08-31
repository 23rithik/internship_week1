// Footer.jsx
import React from 'react';
import { Typography, Container, Box, Grid } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #6e45e2, #4a69bd)',
        color: 'white',
        padding: { xs: '20px 10px', sm: '20px 0' }, // Responsive padding
        marginTop: '40px',
        marginLeft: { xs: '-10px', sm: '-9.4%' }, // Responsive margin adjustments
        marginRight: { xs: '-10px', sm: '-9.3%' },
        marginBottom: '-5%',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {/* Left-aligned Cinema Tickets title */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" align="left" gutterBottom style={{ paddingTop: "30px", paddingLeft: "100px" }}>
              Cinema Tickets
            </Typography>
          </Grid>

          {/* Right-aligned contact information */}
          <Grid item xs={12} sm={5} style={{paddingTop:"2%"}}>
            <Typography variant="body1" align="center">
              Contact Information:
            </Typography>
            <Typography variant="body2" align="center">
              Phone: +1 (123) 456-7890
            </Typography>
            <Typography variant="body2" align="center">
              Address: 123 Movie Street, Cinema City, CC 12345
            </Typography>
            <Typography variant="body2" align="center">
              Email: info@cinematickets.com
            </Typography>
          </Grid>
        </Grid>

        {/* Centered Copyright Information */}
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={{ marginTop: '30px' }}
        >
          &copy; {new Date().getFullYear()} Cinema Tickets. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
