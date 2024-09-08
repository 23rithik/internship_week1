const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  movie_name: String,
  image: String,
  category: String,
  languages: String,  // Keep it as a string since it's comma-separated
  description: String,
  cast: String,
  ticket_rate: String,
  no_of_seats: String
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
