const lyricsService = require('../services/lyricsService');

const execute = async ({ title, artist }) => {
    return await lyricsService.fetchLyrics(title, artist);
};

module.exports = { execute };