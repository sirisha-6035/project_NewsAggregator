// app.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cookieParser = require('cookie-parser');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3003;

// Database connection
const connectDB = require('./config/db');
connectDB();

// Middleware
app.use(cookieParser()); // Middleware to parse cookies
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded form data

// Static file middleware (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assets')));

// Session setup with FileStore
const sessionDirectory = path.join(__dirname, 'sessions');
app.use(session({
    store: new FileStore({
        path: sessionDirectory, // Set the path for storing session files
        ttl: 86400 // Optional: set time to live for sessions (in seconds)
    }),
    secret: 'your_session_secret', // Change this to a secure secret
    resave: false,
    saveUninitialized: true,
}));

// Ensure the directory for sessions exists
if (!fs.existsSync(sessionDirectory)) {
    fs.mkdirSync(sessionDirectory);
}

// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware to log cookies
app.use((req, res, next) => {
    console.log('Cookies:', req.cookies); // Print cookies in the console
    next(); // Pass control to the next middleware
});

// Routes
const registerRoute = require('./routes/registerRoute');
const loginRoute = require('./routes/loginRoute');
const subscribeRoute = require('./routes/subscribeRoute');
const { protect } = require('./middleware/auth');

// Use routes
app.use('/', registerRoute);
app.use('/', loginRoute);
app.use('/', subscribeRoute);

// General routes
app.get('/', (req, res) => res.redirect('/index'));
app.get('/index', (req, res) => res.render('index'));
app.get('/aboutus', (req, res) => res.render('aboutus'));
app.get('/Usersprofile', (req, res) => res.render('users/Usersprofile'));
app.get('/contact', (req, res) => res.render('contact')); // Render the contact form
app.get('/register', (req, res) => res.render('register'));
app.get('/login', (req, res) => res.render('login'));
app.get('/newsProject', (req, res) => res.render('newsProject'));
app.get('/thankyou', (req, res) => res.render('thankyou'));
app.get('/subscribe', (req, res) => res.render('subscribe'));

// POST route to handle contact form submission
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Handle the contact form submission here
    console.log(`Contact Form Submitted - Name: ${name}, Email: ${email}, Message: ${message}`);

    // Respond with a thank-you message
    res.render('thankyou', { message: 'Thank you for contacting us!' });
});

// Protected route
app.get('/News', protect, (req, res) => {
    res.render('users/News', { user: req.user });
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/News');
        }
        res.clearCookie('token'); // Optional: clear the token cookie on logout
        res.redirect('/index');
    });
});

// Example of a basic redirect
app.get('/old-page', (req, res) => {
    res.redirect('/new-page');
});

// Route for the new page
app.get('/new-page', (req, res) => {
    res.send('You have been redirected to the new page!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
