const express = require('express');
const path = require('path');
const fs = require('fs');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 8000;
const registerRoute = require('./routes/registerRoute'); 
const loginRoute = require('./routes/loginRoute');
const subscribeRoute = require('./routes/subscribeRoute');
// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); // Adjust to your views directory

// Middleware to serve static files (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON bodies
app.use(express.json()); // For parsing application/json
app.use('/', registerRoute);
app.use('/', loginRoute);
app.use(express.urlencoded({ extended: true })); // To parse form data

app.use('/', subscribeRoute); // Make sure to use the subscribeRoute


// Mock user data (Replace with your actual user authentication logic)
const mockUser = {
  username: 'User123' // Replace with the actual logged-in user's username
};
const loadUsers = () => {
    const dataPath = path.join(__dirname, 'data', 'users.json');
    const rawData = fs.readFileSync(dataPath);
    return JSON.parse(rawData);
};

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Load users from JSON file
  const users = loadUsers();

  // Find user by username and password
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
      //req.session.Name = user.name; // Assuming users have a 'name' property
      res.redirect('/dashboard'); // Redirect to dashboard on successful login
  } else {
      res.status(401).send('Invalid username or password');
  }
});

// Route for the home page
app.get('/', (req, res) => {
  res.render('index', { username: mockUser.username }); // Render the Pug template and pass the username
});

// Add more routes as needed
app.get('/aboutus', (req, res) => {
  res.render('aboutus'); // Example route for about us page
});

app.get('/contact', (req, res) => {
  res.render('contact'); // Example route for contact page
});

app.get('/practice', (req, res) => {
  res.render('practice'); // Example route for practice page
});

// Registration page route
app.get('/register', (req, res) => {
  res.render('register'); // Render the registration page
});

// Login page route
app.get('/login', (req, res) => {
  res.render('login'); // Render the login page
});

// Route for the Thank You page

// Logout route (placeholder)
app.get('/index', (req, res) => {
  // Handle logout logic here (e.g., clearing session, etc.)
  res.redirect('/'); // Redirect to home after logout
});

// Registration endpoint
app.post('/register', (req, res) => {
  const newUser = req.body;

  // Read existing users from users.json
  fs.readFile(path.join(__dirname, 'data', 'users.json'), 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading users file:", err);
      return res.status(500).json({ message: 'Internal server error.' });
    }

    // Parse the existing data
    let users;
    try {
      users = JSON.parse(data);
    } catch (parseError) {
      console.error("Error parsing users file:", parseError);
      return res.status(500).json({ message: 'Internal server error.' });
    }

    // Add the new user if not already registered (this can be replaced with better validation)
    const existingUser = users.find(user => user.email === newUser.email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already registered.' });
    }

    // Add the new user to the array
    users.push(newUser);

    // Write the updated users back to the file
    fs.writeFile(path.join(__dirname, 'data', 'users.json'), JSON.stringify(users, null, 2), (writeErr) => {
      if (writeErr) {
        console.error("Error writing to users file:", writeErr);
        return res.status(500).json({ message: 'Internal server error.' });
      }
      res.status(201).json({ message: 'User registered successfully.' });
    });
  });
});
app.get('/java', (req, res) => {
    res.render('java'); // Render java.pug
  });
  
  app.get('/javascript', (req, res) => {
    res.render('javascript'); // Render javascript.pug
  });
  
  app.get('/practice', (req, res) => {
    res.render('practice'); // Render practice.pug
  });
  
  app.get('/python', (req, res) => {
    res.render('python'); // Render python.pug
  });
  
 
  app.get('/thankyou', (req, res) => {
    res.render('thankyou'); // Render thankyou.pug
  });
  app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Failed to log out');
        }
        res.redirect('/'); // Redirect to home after logout
    });
});

 
  
  app.get('/dashboard', (req, res) => {
    //const username = req.session.username || 'Guest';
    res.render('dashboard'); // Render dashboard.pug
  });
  
  app.get('/c', (req, res) => {
    res.render('c'); // Render c.pug
  });
  
  app.get('/contact', (req, res) => {
    res.render('contact'); // Render contact.pug
  });
  
  app.get('/', (req, res) => {
    const username = req.session.username || 'Guest'; // Default to 'Guest' if not logged in
    res.render('index', { username });
});
  app.get('/cplus', (req, res) => {
    res.render('cplus'); // Render cplus.pug
  });
  
  app.get('/aboutus', (req, res) => {
    res.render('aboutus'); // Render aboutus.pug
  });
  app.get('/subscribe', (req, res) => {
    res.render('subscribe'); 
  });
  app.get('/chatroom', (req, res) => {
    res.render('chatroom'); 
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
