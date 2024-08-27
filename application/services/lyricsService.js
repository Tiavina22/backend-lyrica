const lyricsRepository = require('../../infrastructure/database/lyricsMySQLRepository');

const fetchLyrics = async (title, artist) => {
    try {
        let normalizedTitle = normalizeTitle(title);
        normalizedTitle = await lyricsRepository.getNormalizedTitle(normalizedTitle);
        const normalizedArtist = await lyricsRepository.getNormalizedArtist(artist);

        console.log(`Normalized title: ${normalizedTitle}`);
        console.log(`Normalized artist: ${normalizedArtist}`);

        return await lyricsRepository.findLyrics(normalizedTitle, normalizedArtist);
    } catch (err) {
        console.error('Error in fetchLyrics:', err);
        return null;
    }
};

// Function to normalized title with regex
let normalizeTitle = (title) => {
    let extractedTitle = title.split('-')[1]?.trim() || title.trim();
    extractedTitle = extractedTitle.split('[')[0].trim();
    extractedTitle = extractedTitle.replace(/\(.*?\)/g, '').trim();
    return extractedTitle.toLowerCase();
};

module.exports = { fetchLyrics };
