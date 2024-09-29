import React, { useState } from 'react';
import { Button, Grid, TextField, Container, Typography, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import axiosInstance from '../axiosintercepter';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const response = await axiosInstance.post('https://internship-week1backend.vercel.app/api/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);

      navigate(email === 'admin@gmail.com' ? '/admin_home' : '/customer_home');
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="xs" sx={{ mt: 15, mb: 7, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" component="h1" gutterBottom style={{ marginBottom: '15%' }}>
          LOGIN
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Grid container spacing={2} style={{ marginBottom: '20%' }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'LOGIN'}
            </Button>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Typography variant="body2" align="center">
              Don't have an account?{' '}
              <Link to="/signup" style={{ textDecoration: 'none' }}>
                <Button variant="text">SIGNUP</Button>
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
