import React from 'react';
import './Footer1.css'; // Make sure to create a CSS file for styling

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about " id='bg' >
                    <h2>About Us</h2>
                    <p>
                        Welcome to our restaurant! We offer a wide variety of delicious meals made with fresh ingredients.
                        Join us for a memorable dining experience.
                    </p>
                </div>
                <div className="footer-section menu">
                    <h2>Menu</h2>
                    <ul>
                        <li><a href="/menu/appetizers">Appetizers</a></li>
                        <li><a href="/menu/main-courses">Main Courses</a></li>
                        <li><a href="/menu/desserts">Desserts</a></li>
                        <li><a href="/menu/drinks">Drinks</a></li>
                    </ul>
                </div>
                <div className="footer-section contact">
                    <h2>Contact Us</h2>
                    <p>Email: contact@restaurant.com</p>
                    <p>Phone: +1 (555) 123-4567</p>
                </div>
                <div className="footer-section social">
                    <h2>Follow Us</h2>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Restaurant Name. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
