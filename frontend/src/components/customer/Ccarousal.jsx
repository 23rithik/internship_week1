// Carousel.jsx
import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom'; // Import Link for navigation
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Carousel images
const carouselImages = [
  'https://i.redd.it/wgsajydj1r3d1.jpeg?text=Image+3',
  'https://c4.wallpaperflare.com/wallpaper/89/717/68/rajnikanth-kaala-kaala-karikaalan-tamil-wallpaper-preview.jpg?text=Image+2',
  'https://wallpapers.com/images/hd/rrr-movie-trailer-poster-u79atg08s19esbf6.jpg',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgm_WtP2Ok5RRbds4Zys7sJDRBAVtv6rMrWC1Si-AvUzAxPdx4GZbbm0zOSS30sAGRvg2TomryiQ5TWOXN7_6gF4OPs96KqZvW4qEVjcAEcpw7B5jGBCVJ4REgQuUev3hii1x6htGSXk_xU/s1600/Cinderella-2015-Movie-Poster-HD-Wallpapers.jpg',
  'https://wallpapercave.com/wp/wp8807405.jpg?text=Image+1'
];

const Ccarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    // <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div 
        style={{ 
          width: '100%', 
          marginTop: "-15%", 
          position: 'relative',
          // Background gradient
          borderRadius: '16px', // Rounded corners
          overflow: 'hidden', // Ensure images are clipped to the rounded corners
          height: '600px' // Set a fixed height for the carousel
        }}
      >
        <Slider {...settings}>
          {carouselImages.map((image, index) => (
            <div key={index} style={{ position: 'relative', height: '100%', borderRadius: '16px' }}>
              <img 
                src={image} 
                alt={`Slide ${index}`} 
                style={{ 
                  width: '100%', 
                  height: '100%', // Make sure the image covers the entire area of the carousel
                  objectFit: 'cover', // Cover the entire area without stretching
                  borderRadius: '16px' // Rounded corners for images
                }} 
              />
            </div>
          ))}
        </Slider>
      </div>
    // </Link>
  );
};

export default Ccarousel;
