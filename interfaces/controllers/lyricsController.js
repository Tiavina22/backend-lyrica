const getLyricsUseCase = require('../../application/useCases/getLyrics');

// Get Lyrics with title and artist name are required
const getLyrics = async (req, res) => {
    const { title, artist } = req.query;
     console.log(`Received title: ${title}`);
        console.log(`Received artist: ${artist}`);
    if (!title || !artist) {
        return res.status(400).json({ error: 'Title and artist are required' });
    }

    try {
        const lyrics = await getLyricsUseCase.execute({ title, artist });
        if (!lyrics) {
            return res.status(404).json({ error: 'Lyrics not found' });
        }
        res.json(lyrics);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getLyrics };