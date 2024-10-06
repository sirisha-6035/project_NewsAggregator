// routes/subscribeRoute.js

const express = require('express');
const router = express.Router();

router.post('/subscribe', (req, res) => {
    const { email } = req.body; // Assuming you're sending an email from a form

    // Here, you can handle the subscription logic (e.g., save the email to a database)
    console.log(`Subscribed email: ${email}`);

    // Redirect to a success page (like a subscription success page)
    res.render('subscribe', { email }); // Pass the email to the subscription success page
});

module.exports = router;
