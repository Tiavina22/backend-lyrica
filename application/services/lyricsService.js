const lyricsRepository = require('../../infrastructure/database/lyricsMySQLRepository');

const fetchLyrics = async (title, artist) => {
    const normalizedTitle = normalizeTitle(title);
    const normalizedArtist = await lyricsRepository.getNormalizedArtist(artist);

    console.log(`Normalized title: ${normalizedTitle}`);
    console.log(`Normalized artist: ${normalizedArtist}`);
    return await lyricsRepository.findLyrics(normalizedTitle, normalizedArtist);
};

const normalizeTitle = (title) => {
    let extractedTitle = title.split('-')[1]?.trim() || title.trim();
    extractedTitle = extractedTitle.split('[')[0].trim();
    extractedTitle = extractedTitle.replace(/\(.*?\)/g, '').trim();
    return extractedTitle.toLowerCase();
};

module.exports = { fetchLyrics };