const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Path to the data file
const dataFilePath = path.join(__dirname, '../data', 'users.json');

// Handle login
router.post('/', (req, res) => {
    const { username, password } = req.body;

    // Load existing users from users.json
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading user data');
        }

        const users = data ? JSON.parse(data) : [];

        // Find the user with matching username and password
        const user = users.find(user => user.email === email && user.password === password);

        if (!user) {
            return res.status(401).send('Invalid email or password');
        }

        // Successful login
        res.render('dashboard', { username});
    });
});

module.exports = router;
