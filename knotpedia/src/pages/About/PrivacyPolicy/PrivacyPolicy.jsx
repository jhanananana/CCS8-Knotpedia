import React from "react";
import Navbar from "../../Components/Navbar.jsx";
import Footer from "../../Components/Footer.jsx";
import "./PrivacyPolicy.css";
const PrivacyPolicy = () => {
  return (

    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div>
        <div className="subHeader blueCover">
          <div className="container">
            <h1>Privacy Policy</h1>
            <p>
              We respect your privacy. Learn how we handle emails
              and website data while keeping your information secure.
            </p>
          </div>
        </div>

        <div className="container">
          <nav className="breadcrumb">
            <a href="/" className="breadcrumb-link">
              <img src="/assets/home-icon.png" alt="Home Icon" />
              <span>Home</span>
            </a>
            &gt;
            <a href="/about">About Us</a>
            &gt;
            <span className="active">Privacy Policy</span>
          </nav>

          <div className="space-y-4">
            <div className="text-Container">
              <section className="sectionText blue">
                <h3>1. Information We Collect</h3>
                <ul className="list">
                  <li>Emails: If you contact us with a suggestion or question, we collect your email address to respond to your inquiry.</li>
                </ul>
              </section>

              <section className="sectionText blue">
                <h3>2. How We Use Your Information</h3>
                <ul className="list">
                  <li>To respond to your suggestions or questions.</li>
                  <li>We do not sell, rent, or share your personal information with third parties.</li>
                </ul>
              </section>

              <section className="sectionText blue">
                <h3>3. Data Security</h3>
                <ul className="list">
                  <li>We take reasonable measures to protect any collected information.
                    However, no online platform is 100% secure.</li>
                </ul>
              </section>

              <section className="sectionText blue">
                <h3>4. Changes to These policy</h3>
                <ul className="list">
                  <li>We may update this policy as needed.
                    Continued use of Knotpedia after updates means you accept the revised policy.</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
