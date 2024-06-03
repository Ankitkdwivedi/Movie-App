const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    poster: String,
    title: String,
    type: String,
    year: String,
    imdbID: String
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
