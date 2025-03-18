import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="container">
      {/* Breadcrumb */}
      <nav className="breadcrumb"> <a href="/">Home</a> &gt; About Us</nav>

      {/* About Section */}
      <div className="about-section">
        <h2 className="about-title">
          About <span className="highlight">Knotpedia</span>
        </h2>
        <p>
          At <strong>Knotpedia</strong>, we're dedicated to making knot-tying accessible for everyone. Our platform offers easy-to-follow guides and tutorials for all skill levels, from beginners to experts.
        </p>
        <p>
          Whether for outdoor activities or everyday use, we aim to help you master knots with confidence.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="mission-vision">
        <div className="mission">
          <h3 className="mission-title">Our <span className="blue">Mission</span></h3>
          <p>
            At <strong>Knotpedia</strong>, we’re dedicated to making knot-tying accessible for everyone. Our platform offers easy-to-follow guides and tutorials for all skill levels, from beginners to experts.
          </p>
        </div>
        <div className="vision">
          <h3 className="vision-title">Our <span className="red">Vision</span></h3>
          <p>
            At <strong>Knotpedia</strong>, we follow a vision to make knot-tying easier for everyone. Our platform offers easy-to-follow guides and tutorials for all skill levels, from beginners to experts.
          </p>
        </div>
      </div>

      {/* Policy Cards */}
      <div className="policy-cards">
        <div className="card">
          <h4 className="blue">Frequently Asked Questions</h4>
          <p>Find answers to common questions.</p>
        </div>
        <div className="card border-blue">
          <h4 className="blue">Terms & Conditions</h4>
          <p>Understand our site's rules and policies.</p>
        </div>
        <div className="card">
          <h4 className="red">Privacy Policy</h4>
          <p>Learn how we handle your data securely.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
