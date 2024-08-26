const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const lyricsController = require('../../interfaces/controllers/lyricsController');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Routing
app.get('/lyrics', lyricsController.getLyrics);

module.exports = app;