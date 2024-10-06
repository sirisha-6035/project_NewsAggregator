// assets/js/footer.js

// Load Footer Content
function loadFooter() {
    document.getElementById("footer").innerHTML = `
        <footer class="footer">
            <div class="footer-container">
                <!-- Quick Links -->
                <div class="footer-section quick-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="./index" aria-label="Home">Home</a></li>
                        <li><a href="./aboutus" aria-label="About Us">About Us</a></li>
                        <li><a href="./login" aria-label="Contact">Login</a></li>
                    </ul>
                </div>

                <!-- Contact Information -->
                <div class="footer-section contact-info">
                    <h4>Contact Us</h4>
                    <p>Email: <a href="mailto:contact@codesync.com" aria-label="Send Email">contact@codesync.com</a></p>
                    <p>Phone: <a href="tel:+1234567890" aria-label="Call Phone">+1 234 567 890</a></p>
                </div>

                <!-- Newsletter Subscription -->
                <div class="footer-section newsletter">
                    <h4>Subscribe to our Newsletter</h4>
                    <form action="/subscribe" method="POST" id="newsletterForm" aria-label="Newsletter Subscription">
                        <input
                            type="email"
                            id="newsletter-email"
                            name="email"
                            placeholder="Enter your email"
                            required
                            aria-label="Email Address"
                        />
                        <button type="submit" aria-label="Subscribe to Newsletter">Subscribe</button>
                    </form>
                </div>

                <!-- Social Media Icons -->
                <div class="footer-section social-icons">
                    <h4>Follow Us</h4>
                    <a href="https://facebook.com/codesync" target="_blank" aria-label="Facebook" rel="noopener noreferrer">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://twitter.com/codesync" target="_blank" aria-label="Twitter" rel="noopener noreferrer">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="https://instagram.com/codesync" target="_blank" aria-label="Instagram" rel="noopener noreferrer">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="https://linkedin.com/company/codesync" target="_blank" aria-label="LinkedIn" rel="noopener noreferrer">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                </div>
            </div>

            <!-- Footer Bottom and Back to Top -->
            <div class="footer-bottom">
                <p>&copy; 2024 Code Sync. All Rights Reserved.</p>
                <a href="#header" class="back-to-top" aria-label="Back to Top">
                    <i class="fas fa-arrow-up"></i> Back to Top
                </a>
            </div>
        </footer>
    `;
}

// Handle newsletter form submission
function addNewsletterFormListener() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('newsletter-email').value.trim();
            if (validateEmail(email)) {
                // In a real application, you would send this data to the server
                alert('Thank you for subscribing to our newsletter!');
                newsletterForm.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
}

// Basic email validation function
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
