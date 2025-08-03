const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const streamId = req.query.id || '60';
    const streamUrl = `https://thedaddy.to/embed/stream-${streamId}.php`; // Try embed URL
    try {
        const response = await fetch(streamUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const data = await response.text();
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(data);
    } catch (error) {
        res.status(500).send('Error fetching stream: ' + error.message);
    }
};
