const db = require('./connection');

// Normalized for artist name
const getNormalizedArtist = async (artist) => {
    const cleanedArtist = artist.replace(/(VEVO|Official|Video)$/i, '').trim().toLowerCase();
    
    return new Promise((resolve, reject) => {
        db.query('SELECT normalized_name FROM artist_aliases WHERE LOWER(alias) = ?', [cleanedArtist], (err, results) => {
            if (err) return reject(err);
            resolve(results.length > 0 ? results[0].normalized_name : cleanedArtist);
        });
    });
};

// Normalized for title
const getNormalizedTitle = async (title) => {
    const cleanedTitle = title.trim().toLowerCase();

    return new Promise((resolve, reject) => {
        db.query('SELECT normalized_name FROM lyrics_aliases WHERE LOWER(alias) = ?', [cleanedTitle], (err, results) => {
            if (err) return reject(err);
            console.log('Query results:', results);
            resolve(results.length > 0 ? results[0].normalized_name : cleanedTitle);
        });
    });
};

// Find the lyrics in database
const findLyrics = async (title, artist) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT lyrics.*, artist.name as artist_name
            FROM lyrics
            JOIN artist ON lyrics.artist_id = artist.id
            WHERE LOWER(lyrics.title) = ? AND LOWER(artist.name) = ?`;
        
        db.query(query, [title, artist], (err, results) => {
            if (err) return reject(err);
            resolve(results.length > 0 ? results[0] : null);
        });
    });
};

module.exports = { getNormalizedArtist, getNormalizedTitle, findLyrics };
