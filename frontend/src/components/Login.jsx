import React from 'react';
import { Button, Grid, TextField, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Login = () => {
  return (
    <>
      <Navbar />
      <Container
        component="main"
        maxWidth="xs"
        sx={{ mt: 15, mb: 7, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography variant="h5" component="h1" gutterBottom style={{ marginBottom: "15%" }}>
          LOGIN
        </Typography>
        <Grid container spacing={2} style={{marginBottom:"20%"}}>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              id="outlined-email"
              label="Email id"
              name="email"
              type="email"
              sx={{
                background: 'linear-gradient(135deg, #f0f0f0, #e0e0e0)', // Light gray gradient background
                borderRadius: '4px',
                '& .MuiInputBase-root': {
                  background: 'transparent', // Ensure input text area is transparent
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ccc', // Light border for better visibility
                  },
                  '&:hover fieldset': {
                    borderColor: '#bbb', // Border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#aaa', // Border color when focused
                  },
                },
              }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              id="outlined-password"
              type="password"
              label="Password"
              name="password"
              sx={{
                background: 'linear-gradient(135deg, #f0f0f0, #e0e0e0)', // Light gray gradient background
                borderRadius: '4px',
                '& .MuiInputBase-root': {
                  background: 'transparent', // Ensure input text area is transparent
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ccc', // Light border for better visibility
                  },
                  '&:hover fieldset': {
                    borderColor: '#bbb', // Border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#aaa', // Border color when focused
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
          <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                my: 2,
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Initial shadow
                '&:hover': {
                  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)', // Deeper shadow on hover
                  transform: 'translateY(-4px)', // Lift effect
                  transition: 'all 0.3s ease', // Smooth transition
                },
              }}
            >
              LOGIN
            </Button>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Typography variant="body2" align="center">
              Don't have an account?{' '}
              <Link to="/signup" style={{ textDecoration: 'none' }}>
              <Button
              variant="text"
              sx={{
                my: 2,
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Initial shadow
                '&:hover': {
                  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)', // Deeper shadow on hover
                  transform: 'translateY(-4px)', // Lift effect
                  transition: 'all 0.3s ease', // Smooth transition
                },
              }}
            >SIGNUP</Button>
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  )
}

export default Login