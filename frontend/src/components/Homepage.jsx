// Homepage.jsx
import React from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import Carousel from './Carousal'; // Make sure the import path is correct
import { Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import Footer from './Footer';


const movies = [
    {
      title: 'Manorajyam',
      image: 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-250,h-390/et00407541-jphzfwljmu-portrait.jpg?text=Movie+1',
      rating: '4.5',
      category: 'U',
      languages: ['Malayalam'],
    },
    {
      title: 'Deadpool & Wolverine',
      image: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/deadpool-and-wolverine-et00404346-1720635259.jpg?text=Movie+2',
      rating: '4.0',
      category: 'A',
      languages: ['English','Telungu','Hindi', 'Tamil'],
    },
    {
      title: 'Despicable Me 4',
      image: 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-250,h-390/et00386901-lyxemsvmls-portrait.jpg?text=Movie+3',
      rating: '3.5',
      category: 'U',
      languages: ['English','Telungu','Hindi', 'Tamil'],
    },
    // Add more movies as needed
  ];
  const movies1 = [
    {
      title: 'Deevadoothan',
      image: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/devadoothan-et00405428-1721630205.jpg?text=Movie+1',
      rating: '4.5',
      category: 'UA',
      languages: ['Malayalam'],
    },
    {
      title: 'Manichitrathazhu',
      image: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/manichitrathazhu-et00407204-1722850466.jpg?text=Movie+2',
      rating: '4.0',
      category: 'U',
      languages: ['Malayalam'],
    },
    {
      title: 'Vazha',
      image: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/vaazha--biopic-of-a-billion-boys-et00405504-1721571939.jpg?text=Movie+3',
      rating: '4.5',
      category: 'UA',
      languages: ['Malayalam'],
    },
    // Add more movies as needed
  ];


const Homepage = () => {

    const navigate = useNavigate(); // Initialize useNavigate

  const handleBookNow = () => {
    navigate('/signup'); // Navigate to Signup page
  };
  return (
    <>
      <Navbar />
      <div style={{ marginTop: '20%', padding: '0 10%' }}>
        <Carousel />
      </div>
      

      <div style={{ padding: '0 10%', marginTop: '30px' }}>
        <Typography variant="h4" gutterBottom style={{marginBottom:"30px"}}>
          Latest Releases
        </Typography>
        <Grid container spacing={4}>
          {movies.map((movie, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="400"
                  image={movie.image}
                  alt={movie.title}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rating: {movie.rating} ⭐
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Category: {movie.category}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Languages: {movie.languages.join(', ')}
                  </Typography>
                  <Button variant="contained" color="primary" style={{ marginTop: '10px' }} onClick={handleBookNow}>
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        

        <Typography variant="h4" gutterBottom style={{marginBottom:"30px",marginTop:"40px"}}>
          Popular Releases
        </Typography>
        <Grid container spacing={4}>
          {movies1.map((movie, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="400"
                  image={movie.image}
                  alt={movie.title}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rating: {movie.rating} ⭐
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Category: {movie.category}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Languages: {movie.languages.join(', ')}
                  </Typography>
                  <Button variant="contained" color="primary" style={{ marginTop: '10px' }} onClick={handleBookNow}>
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>



        {/* Add more sections like Most Popular, Coming Soon, etc. in a similar way */}
        {/* You can create separate arrays for each category and map them into different grids */}
      </div>
        
        <Footer/>
    </>
  );
};

export default Homepage;
