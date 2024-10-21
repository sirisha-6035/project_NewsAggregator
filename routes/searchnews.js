const express = require('express');
const router = express.Router();

// Dynamic import of node-fetch
const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

const API_KEY = "4267ed7512e677ca0847ae7fb38a6f00"; // Make sure to use your API key
const HEADLINES_NEWS = `http://api.mediastack.com/v1/news?access_key=${API_KEY}&countries=in`;

router.get('/headlines', async (req, res) => {
    try {
        const response = await fetch(HEADLINES_NEWS);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching news" });
    }
});

module.exports = router;
