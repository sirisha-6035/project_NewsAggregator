const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Body-parser to handle form data
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  // You can add email sending logic here or store the message in a database
  console.log(`Received message from ${name} (${email}): ${message}`);

  // Respond back to the user
  res.send('Thank you for reaching out! We will get back to you soon.');
});

document.querySelector('.contact-form').addEventListener('submit', function (event) {
    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const message = document.querySelector('#message').value.trim();
  
    if (!name || !email || !message) {
      event.preventDefault(); // Prevent form submission
      alert('Please fill out all fields.');
    }
  });
  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
