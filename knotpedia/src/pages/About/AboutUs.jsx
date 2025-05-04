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

          <div className="benefits-container">
            <h2>How <span className="blue">Knot</span><span className="red">pedia</span> Helps You</h2>
            <div className="help-container">
              <div className="help-item">
                <img src="/assets/home-type.png" className="help-icon blueBg" alt="Type Icon" />
                <h3 style={{color: '#0d6287'}}>Efficiency</h3>
                <p>Our tutorials save you time by teaching knots quickly, without the confusion.</p>
              </div>
              <div className="help-item">
                <img src="/assets/home-type.png" className="help-icon lightblueBg" alt="Type Icon" />
                <h3 style={{color: '#5192a5'}} className="">Practicality</h3>
                <p>Gain real-world skills you can use for camping, crafting, work, and everyday life.</p>
              </div>
              <div className="help-item">
                <img src="/assets/home-type.png" className="help-icon redBg" alt="Type Icon" />
                <h3 style={{color: '#b54d49'}} >Clarity</h3>
                <p>Knotpedia offers easy-to-follow guides that make learning knots clear and stress-free for everyone.</p>
              </div>
            </div>
          </div>

          {/* Mission & Vision Section */}
          <div className="about-container">
            <div className="mission">
              <img src="/assets/about.jpeg" alt="Knot activity" />
              <div className="box-desc">
                <h2 className="box-title">
                  <span className="blue-text">Our Mission: <br></br> </span>
                  Empower Through Every Knot

                </h2>
                At <strong>Knotpedia</strong>, we’re here to make knot-tying easy and fun for everyone.
                With simple guides and step-by-step tutorials, we help beginners learn the basics and give experts new ideas to explore.
              </div>
            </div>
          </div>
          <div className="about-container">
            <div className="mission">
              <div className="box-desc">
                <h2 className="box-title">
                  <h2 className="box-title"><span className="red-text">Our Vision: <br></br></span>
                    A World Connected by Skill and Simplicity
                  </h2>
                </h2>
                We dream of a world where tying knots feels easy and natural for everyone.
                By sharing clear lessons and friendly visuals, Knotpedia makes learning fast, fun, and frustration-free.
              </div>
              <img src="/assets/knot-activity.png" alt="Knot activity" />

            </div>
          </div>
          <div className="card-container">
            <h3 style={{ textAlign: "center" }}>Help & Legal Information</h3>
            <div className="policy-cards">
              <div className="card" style={{ backgroundColor: "#0d6287" }}>
                <a href="/FAQs" title="Frequently Asked Questions">
                  <h4 className="blue title-card">Frequently Asked Questions (FAQs)</h4>
                  <p>Find answers to common questions.</p>
                </a>
              </div>

              <div className="card" style={{ backgroundColor: "#5192A5" }} title="Terms and Conditions">
                <a href="/termsandconditions">
                  <h4 className="blue">Terms & Conditions</h4>
                  <p>Understand our site's rules and policies.</p>
                </a>
              </div>

              <div className="card" style={{ backgroundColor: "#b54d49" }} title="Privacy Policy">
                <a href="/privacypolicy">
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
