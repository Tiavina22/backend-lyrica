const db = require('./connection');

const getNormalizedArtist = async (artist) => {
    const cleanedArtist = artist.replace(/(VEVO|Official|Video)$/i, '').trim().toLowerCase();
    
    return new Promise((resolve, reject) => {
        db.query('SELECT normalized_name FROM artist_aliases WHERE LOWER(alias) = ?', [cleanedArtist], (err, results) => {
            if (err) return reject(err);
            resolve(results.length > 0 ? results[0].normalized_name : cleanedArtist);
        });
    });
};

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

module.exports = { getNormalizedArtist, findLyrics };