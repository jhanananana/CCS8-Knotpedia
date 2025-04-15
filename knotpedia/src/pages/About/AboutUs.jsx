import React from "react";
import "./AboutUs.css";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <div className="POPPINS-ABOUTUS">
        <div className="subHeader redCover">
          <div className="container">
            <h1>About Knotpedia</h1>
            <p>
              At <strong>Knotpedia</strong>, we're dedicated to making knot-tying accessible for everyone.
            </p>
          </div>
        </div>

        <main className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <a href="/" className="breadcrumb-link">
              <img src="/assets/home-icon.png" alt="Home Icon" />
              <span>Home</span>
            </a>
            &gt; <span className="active">About Us</span>
          </nav>

          {/* Mission & Vision Section */}
          <div className="about-container">
            <div className="mission">
              <img src="/assets/knot-activity.png" alt="Knot activity" />
              <div className="box-desc">
                <h2 className="box-title">
                  Our <span className="blue-text">&nbsp;Mission</span>
                </h2>
                At <strong>Knotpedia</strong>, we’re dedicated to making knot-tying accessible for everyone.
                Our platform offers easy-to-follow guides and tutorials for all skill levels, from beginners to experts.
              </div>
            </div>
          </div>

          <div className="about-container">
            <div className="mission">
              <div className="box-desc">
                <h2 className="box-title">
                  <h2 className="box-title">Our<span className="red-text">&nbsp;Vision</span></h2>
                </h2>
                We envision a world where knot-tying is second nature for everyone.
                Through clear tutorials and visual guides, Knotpedia makes learning knots fun, fast, and frustration-free.
              </div>
              <img src="/assets/knot-activity.png" alt="Knot activity" />

            </div>
          </div>

          <hr />
          <div className="card-container">
            <h3 style={{ textAlign: "center" }}>Help & Legal Information</h3>
            <div className="policy-cards">
              <div className="card" style={{ backgroundColor: "#0d6287" }}>
                <a href="/FAQ">
                  <h4 className="blue title-card">Frequently Asked Questions (FAQs)</h4>
                  <p>Find answers to common questions.</p>
                </a>
              </div>

              <div className="card" style={{ backgroundColor: "#5192A5" }}>
                <a href="/TermsAndConditions">
                  <h4 className="blue">Terms & Conditions</h4>
                  <p>Understand our site's rules and policies.</p>
                </a>
              </div>

              <div className="card" style={{ backgroundColor: "#b54d49" }}>
                <a href="/PrivacyPolicy">
                  <h4 className="red">Privacy Policy</h4>
                  <p>Learn how we handle your data securely.</p>
                </a>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AboutUs;
