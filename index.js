const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch'); // npm install node-fetch@2

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Load data
const rawMovies = JSON.parse(fs.readFileSync('movies.json'));
const movieTitles = Object.values(rawMovies.title);
const movieIds = Object.values(rawMovies.movie_id);
const similarity = JSON.parse(fs.readFileSync('similarity.json'));

// TMDB API key
const TMDB_API_KEY = 'b84d746930e92900ed152d7e54045aa3';

// Fetch poster by movie ID
async function fetchPosterById(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.poster_path) {
            return `https://image.tmdb.org/t/p/w500${data.poster_path}`;
        }
    } catch (err) {
        console.error("Error fetching poster by ID:", err);
    }
    return null;
}

// Home
app.get('/', (req, res) => {
    res.render('index', { recommendations: null, message: null });
});

// Recommend
app.post('/recommend', async (req, res) => {
    const movieName = req.body.movie.trim().toLowerCase();

    const movieIndex = movieTitles.findIndex(title => title.trim().toLowerCase() === movieName);
    if (movieIndex === -1) {
        return res.render('index', { recommendations: null, message: "Movie not found. Try another." });
    }

    const distances = similarity[movieIndex];
    const topIndices = distances
        .map((score, idx) => ({ idx, score }))
        .sort((a, b) => b.score - a.score)
        .filter(item => item.idx !== movieIndex)
        .slice(0, 5)
        .map(item => item.idx);

    const recommendedMovies = await Promise.all(
        topIndices.map(async idx => {
            const poster = await fetchPosterById(movieIds[idx]);
            return {
                title: movieTitles[idx],
                poster: poster || 'https://via.placeholder.com/80x120?text=No+Image'
            };
        })
    );

    res.render('index', { recommendations: recommendedMovies, message: null });
});

// 404
app.use((req, res) => {
    res.status(404).send('<h1>404 - Page Not Found</h1>');
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
