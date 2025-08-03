const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const streamId = req.query.id || '60';
    const streamUrl = `https://thedaddy.to/embed/stream-${streamId}.php`;
    try {
        const response = await fetch(streamUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        let data = await response.text();
        // Optional: Basic ad script filtering (example)
        data = data.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(data);
    } catch (error) {
        res.status(500).send('Error fetching stream: ' + error.message);
    }
};
