import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Logo and description */}
        <div className="footer-brand">
          <a href="/">
            <img src="/assets/logo-dark.png" alt="Knotpedia Logo" title="Knotpedia" className="footer-logo" />
          </a>
          <p className="footer-description">
            Your guide for exploring and mastering knots for every need.
          </p>
          <div className="social-links">
            <a href="https://x.com/jjahnia" target="_blank" rel="noopener noreferrer">
              <img src="/assets/twitter.png" alt="Twitter/X" title="Twitter/X" className="social-icon" />
            </a>
            <a href="https://www.instagram.com/vyn_tiq/" target="_blank" rel="noopener noreferrer">
              <img src="/assets/instagram.png" alt="Instagram" title="Instagram" className="social-icon" />
            </a>
            <a href="https://www.facebook.com/daone.datloveyou" target="_blank" rel="noopener noreferrer">
              <img src="/assets/facebook.png" alt="Facebook" title="Facebook" className="social-icon" />
            </a>
          </div>
        </div>

        {/* Footer sections */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/sitemap">Site Map</a></li>
            <li><a href="/preferences">Preferences</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Explore Knots</h4>
          <ul>
            <li><a href="/knots/all">All Knots</a></li>
            <li><a href="/knots/activities">Knots by Activity</a></li>
            <li><a href="/knots/types">Knots by Type</a></li>
            <li><a href="/glossary">Knots Glossary</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Help & Support</h4>
          <ul>
            <li><a href="/FAQs">FAQs</a></li>
            <li><a href="/privacypolicy">Privacy Policy</a></li>
            <li><a href="/termsandconditions">Terms and Conditions</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Knotpedia | All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
