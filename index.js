require('./infrastructure/config/dotenv');
const expressApp = require('./infrastructure/server/server');

const PORT = process.env.PORT || 5000;
expressApp.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});