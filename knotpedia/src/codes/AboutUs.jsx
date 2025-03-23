import React from "react";
import "./AboutUs.css";
//import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
const AboutUs = () => {
  return (
    
    <div className="flex flex-col min-h-screen">
       <Navbar />
      <div className="POPPINS-ABOUTUS">
      {/* Breadcrumb */}
     
      <nav className="breadcrumb">
      <a href="/Homepage">Home</a> &gt; About Us
      </nav>

      {/* About Section */}
      <div className="about-section">
        <h2 className="about-title">
          About <span ><span className="AboutUshighlight">Knot</span><span className="AboutUshighlight-pedia">pedia</span></span>
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
          <h3 className="mission-title">Our Mission</h3>
          <p>
            At <strong>Knotpedia</strong>, we’re dedicated to making knot-tying accessible for everyone. Our platform offers easy-to-follow guides and tutorials for all skill levels, from beginners to experts.
          </p>
        </div>
        <div className="vision">
          <h3 className="vision-title">Our Vision</h3>
          <p>
            At <strong>Knotpedia</strong>, we follow a vision to make knot-tying easier for everyone. Our platform offers easy-to-follow guides and tutorials for all skill levels, from beginners to experts.
          </p>
        </div>
      </div>

      {/* Policy Cards */}
      <div className="policy-cards">
                  
        <div className="card">
          <h4 className="blue title-card">Frequently Asked <p className="questBig">Questions</p></h4>
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
      <Footer/>
    </div>
    </div>
  );
};

export default AboutUs;
