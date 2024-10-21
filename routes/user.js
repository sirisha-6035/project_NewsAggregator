const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Path to the user.json file
const usersFilePath = path.join(__dirname, '../data/user.json');

// Login route
router.post('/login', (req, res, next) => {
    const { email, password } = req.body;
    // Read the existing users from user.json
    fs.readFile(usersFilePath, 'utf-8', (err, data) => {
        if (err) {
            const err = new Error('Error reading user data');
            err.status = 500;
            return next(err); // Forward to error-handling middleware
        }

        let users = [];
        if (data) {
            users = JSON.parse(data); // Parse existing users
        }

        // Find user by email
        const user = users.find(user => user.email === email);

        // Check if user exists
        if(!user)
            return res.status(401).render('login', { errorMessage: 'Invalid user' });

        // Check if password matches
        if (user.password !== password) { // In a real app, use hashed password comparison
            return res.status(401).render('login', { errorMessage: 'Invalid password' });
        }

        // Store user information in session
        req.session.userId = user.email; // You can store user ID or email
        req.session.user = user;

        // Redirect to the dashboard
        return res.redirect('/user/dashboard');
    });
});

// Dashboard route
router.get('/dashboard', (req, res) => {
   
    // Check if user is authenticated
    if (!req.session.userId) {
        return res.redirect('/login'); // Redirect to login if not authenticated
    }
    res.render('user/dashboard', { user: req.session.user });
});

router.get('/profile', (req, res)=>{

    // Check if user is authenticated
    if (!req.session.userId) {
        return res.redirect('/login'); // Redirect to login if not authenticated
    }
    res.render('user/profile', { user: req.session.user });
})

// Logout route
router.get('/logout', (req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Could not log out. Please try again.");
        }

        // Redirect to login page or home page after logout
        res.redirect('/login');
    });
});

module.exports = router;