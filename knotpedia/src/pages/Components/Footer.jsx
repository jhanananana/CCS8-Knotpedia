import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Logo and description */}
        <div className="footer-brand">
          <a href="/">
            <img src="/assets/logo.png" alt="Knotpedia Logo" className="footer-logo" />
          </a>
          <p className="footer-description">
            Knotpedia — your trusted guide for exploring and mastering knots for every need and adventure.
          </p>
          <div className="social-links">
            <a href="https://x.com/jjahnia" target="_blank" rel="noopener noreferrer">
              <img src="/assets/twitter.png" alt="Twitter" className="social-icon" />
            </a>
            <a href="https://www.instagram.com/vyn_tiq/" target="_blank" rel="noopener noreferrer">
              <img src="/assets/instagram.png" alt="Instagram" className="social-icon" />
            </a>
            <a href="https://www.facebook.com/daone.datloveyou" target="_blank" rel="noopener noreferrer">
              <img src="/assets/facebook.png" alt="Facebook" className="social-icon" />
            </a>
          </div>
        </div>

        {/* Footer sections */}
        <div className="footer-section">
          <h4>Pages</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/preferences">Preferences</a></li>
            <li><a href="/sitemap">Site Map</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Explore Knots</h4>
          <ul>
            <li><a href="/knots/all">All Knots</a></li>
            <li><a href="/knots/activities">Knots by Activity</a></li>
            <li><a href="/knots/types">Knots by Type</a></li>
            <li><a href="/terminology">Terminology</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>About</h4>
          <ul>
            <li><a href="/privacypolicy">Privacy Policy</a></li>
            <li><a href="/FAQs">FAQs</a></li>
            <li><a href="/termsandconditions">Terms and Conditions</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Knotpedia. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
