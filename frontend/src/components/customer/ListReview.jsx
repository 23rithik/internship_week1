import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Card, CardContent, CircularProgress } from '@mui/material';
import axiosInstance from '../../axiosintercepter';
import Cnavbar from './Cnavbar';
import Cfooter from './Cfooter';

// Helper function to render stars based on rating
const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - Math.ceil(rating);
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push('★'); // Full star
  }
  if (halfStar) {
    stars.push('☆'); // Half star
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push('☆'); // Empty star
  }
  return stars.join(' ');
};

const ListReview = () => {
  const { movieName } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:5000/api/viewreview/${encodeURIComponent(movieName)}`);
        setReviews(response.data);
        setLoading(false);
      } catch (error) {
        setError('no reviews');
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieName]);

  if (loading) return <CircularProgress style={{ display: 'block', margin: 'auto' }} />;
  if (error) return <div>{error}</div>;
  if (reviews.length === 0) return <div>No reviews found</div>;

  return (
    <>
      <Cnavbar />
      <div style={{ padding: '2% 5%', marginTop: "7%" }}>
        <Typography variant="h3" gutterBottom style={{ textAlign: 'left' }}>
          Reviews for {movieName}
        </Typography>
        {reviews.map((review) => (
          <Card key={review._id} style={{ marginBottom: '20px', textAlign: 'left' }}>
            <CardContent>
              <Typography variant="h6" component="div">
                Rating: {renderStars(review.rating)}
              </Typography>
              <Typography variant="body1" paragraph>
                Review: {review.review}
              </Typography>
              {/* <Typography variant="subtitle1" color="textSecondary"> */}
                {/* Reviewed by: {reviews.user ? reviews.user.name : 'Anonymous'} Display user name if available */}
              {/* </Typography> */}
            </CardContent>
          </Card>
        ))}
      </div>
      <Cfooter />
    </>
  );
};

export default ListReview;
