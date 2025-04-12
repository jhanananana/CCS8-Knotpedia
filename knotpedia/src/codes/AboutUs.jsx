import React from "react";
import "./AboutUs.css";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <div className="POPPINS-ABOUTUS">
        {/* About Section */}
        <div className="about-header">
        <div className="container">
          <h1 className="p-width">About Knotpedia</h1>
          <p className="p-width">
            At <strong>Knotpedia</strong>, we're dedicated to making knot-tying accessible for everyone. Our platform offers easy-to-follow guides and tutorials for all skill levels, from beginners to experts.
            Whether for outdoor activities or everyday use, we aim to help you master knots with confidence.
          </p>
          </div>
        </div>

        <main className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <a href="/">Home</a> &gt; About Us
          </nav>

          {/* Mission & Vision */}
          <div className="mission-vision">
            <div className="mission">
              <img className="mission-vision-photo" src="/assets/home-header.png"></img>
            </div>
            <div className="mission text">
              <h1>Our <span className="blue-text">Mission</span></h1>
              <p>
                At <strong>Knotpedia</strong>, we’re dedicated to making knot-tying accessible for everyone. Our platform offers easy-to-follow guides and tutorials for all skill levels, from beginners to experts.
              </p>
            </div>
          </div>

          <div className="mission-vision">
            <div className="vision">
              <h1>Our  <span className="red-text">Vision</span></h1>
              <p>
                At <strong>Knotpedia</strong>, we follow a vision to make knot-tying easier for everyone. Our platform offers easy-to-follow guides and tutorials for all skill levels, from beginners to experts.
              </p>
            </div>
            <div className="vision">
              <img className="mission-vision-photo" src="/assets/home-header.png"></img>
            </div>
          </div>

          <hr></hr><br></br>
          <h1 style={{ textAlign: "center" }}>Title or something</h1>
          {/* Policy Cards */}
          <div className="policy-cards">
            <div className="card" style={{ backgroundColor: "#0d6287" }}>
              {/* <div className="icon">
                <img src="/assets/home-difficulty.png" alt="Difficulty Icon" />
              </div> */}
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
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AboutUs;
