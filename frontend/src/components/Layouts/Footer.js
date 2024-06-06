import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Order Now</h4>
          <ul>
            <li>
          <Link to ='/vegetables' className="unstyled-link">
            Vegetables
            </Link>
            </li>
            <li>
            <Link to ='/fruits' className="unstyled-link">
            Fruits
            </Link>
            </li>
            <li>
            <Link to ='/keerai' className="unstyled-link">
            Keerai
            </Link>
            </li>
            
          </ul>
        </div>
        <div className="footer-section">
          <h4>Information</h4>
          <ul>
            <li>
            <Link to ='/termsAndConditions' className="unstyled-link">
            Terms & Condition
            </Link>
            </li>
            <li>
              <Link to ='/privacyPolicy' className="unstyled-link">
                Privacy Policy
                </Link>
                </li>
                <li>
              <Link to ='/refundPolicy' className="unstyled-link">
                Refund Policy
                </Link>
                </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Other Links</h4>
          <ul>
            <li>
            <Link to ='/login' className="unstyled-link">
            Login
            </Link>
            </li>
          <li>
          <Link to ='/register' className="unstyled-link">
            Register
            </Link>
          </li>
            <li>
            <Link to ='/enquiry' className="unstyled-link">
            Enquiry
            </Link>
            </li>
            
          </ul>
        </div>
        <div className="footer-section">
          <h4>Get In Touch</h4>
          <ul>
            <li>29, Reddy St, Nerkundram, Chennai - 600107</li>
            <li>+91 91767 20068</li>
            <li>info@jasfruitsandvegetables.in</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2023 Copyright JAS Fruits and Vegetables. All Rights Reserved</p>
        <p>Design and Developed by Chennai Notes</p>
      </div>
      <img src="https://craftingagreenworld.com/wp-content/uploads/2023/09/fun-mixed-fruit-basket-coloring-pages-4.png" alt="Fruit" className="footer-fruit-image-right" />
      <img src="https://www.indiaparenting.com/coloring-pages/uploads/600004fdc3956.jpg" alt="Fruit" className="footer-fruit-image-left" />
    </footer>
  );
};

export default Footer
