import React, { useState } from 'react';
import { Button, Grid, TextField, Container, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import axiosInstance from '../axiosintercepter';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post('http://localhost:5000/api/login', { email, password });
      // Send login request to the server
      // const response = await axios.post('http://localhost:4000/api/login', { email, password });
      
      // Assuming the response includes a token
      const { token } = response.data;
      localStorage.setItem('token', token); // Store token in localStorage

      // Check if the user is an admin based on email or role
      if (email === 'admin@gmail.com') {
        navigate('/admin_home'); // Admin route
      } else {
        navigate('/customer_home'); // Customer route
      }
    } catch (error) {
      // Handle error (e.g., incorrect email/password)
      setError('Invalid email or password');
    }
  };

  return (
    <>
      <Navbar />
      <Container
        component="main"
        maxWidth="xs"
        sx={{ mt: 15, mb: 7, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography variant="h5" component="h1" gutterBottom style={{ marginBottom: '15%' }}>
          LOGIN
        </Typography>
        {error && <Typography color="error">{error}</Typography>} {/* Display error message */}
        <Grid container spacing={2} style={{ marginBottom: '20%' }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              id="outlined-email"
              label="Email id"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                background: 'linear-gradient(135deg, #f0f0f0, #e0e0e0)',
                borderRadius: '4px',
                '& .MuiInputBase-root': {
                  background: 'transparent',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ccc',
                  },
                  '&:hover fieldset': {
                    borderColor: '#bbb',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#aaa',
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                background: 'linear-gradient(135deg, #f0f0f0, #e0e0e0)',
                borderRadius: '4px',
                '& .MuiInputBase-root': {
                  background: 'transparent',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ccc',
                  },
                  '&:hover fieldset': {
                    borderColor: '#bbb',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#aaa',
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
              onClick={handleLogin}
              sx={{
                my: 2,
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
                  transform: 'translateY(-4px)',
                  transition: 'all 0.3s ease',
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
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                    '&:hover': {
                      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
                      transform: 'translateY(-4px)',
                      transition: 'all 0.3s ease',
                    },
                  }}
                >
                  SIGNUP
                </Button>
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Login;
