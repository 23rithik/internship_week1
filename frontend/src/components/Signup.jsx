import React, { useState } from 'react';
import { Button, Grid, TextField, Container, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import axiosInstance from '../axiosintercepter'; // Axios instance for API requests

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    cpassword: '',
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (!formData.name) tempErrors.name = 'Name is required';
    if (!formData.email) tempErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) tempErrors.email = 'Email is not valid';

    if (!formData.phone) tempErrors.phone = 'Phone number is required';
    else if (!phoneRegex.test(formData.phone)) tempErrors.phone = 'Phone number is not valid';

    if (!formData.location) tempErrors.location = 'Location is required';

    if (!formData.password) tempErrors.password = 'Password is required';
    else if (!passwordRegex.test(formData.password))
      tempErrors.password = 'Password must be at least 8 characters long and include an uppercase letter, a number, and a special character';

    if (!formData.cpassword) tempErrors.cpassword = 'Confirm password is required';
    else if (formData.password !== formData.cpassword) tempErrors.cpassword = 'Passwords do not match';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (validate()) {
      try {   
        const response = await axiosInstance.post('internship-week1backend.vercel.app/api/adduser', formData);
        alert('Registration successful!');
        setErrorMessage('');
        setFormData({
          name: '',
          email: '',
          phone: '',
          location: '',
          password: '',
          cpassword: '',
        });
        navigate('/login'); // Redirect to the login page
      } catch (error) {
        setErrorMessage(error.response?.data?.error || 'Error registering user');
      }
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
        <Typography variant="h5" component="h1" gutterBottom style={{ marginBottom: "15%" }}>
          CUSTOMER SIGNUP
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="outlined-name"
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                sx={inputStyles}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="outlined-email"
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                sx={inputStyles}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="outlined-phone"
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
                sx={inputStyles}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="outlined-location"
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                error={!!errors.location}
                helperText={errors.location}
                sx={inputStyles}
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
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                sx={inputStyles}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="outlined-cpassword"
                type="password"
                label="Confirm Password"
                name="cpassword"
                value={formData.cpassword}
                onChange={handleChange}
                error={!!errors.cpassword}
                helperText={errors.cpassword}
                sx={inputStyles}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={buttonStyles}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
        {errorMessage && (
          <Typography color="error" variant="body2" mt={2}>
            {errorMessage}
          </Typography>
        )}
        <Typography variant="body2" mt={2}>
          Already have an account?{' '}
          <Link to="/login">
            <Button variant="outlined" color="primary">
              Login
            </Button>
          </Link>
        </Typography>
      </Container>
      <Footer />
    </>
  );
};

const inputStyles = {
  background: 'linear-gradient(135deg, #f0f0f0, #e0e0e0)',
  borderRadius: '4px',
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
};

const buttonStyles = {
  my: 2,
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  '&:hover': {
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
    transform: 'translateY(-4px)',
    transition: 'all 0.3s ease',
  },
};

export default Signup;
