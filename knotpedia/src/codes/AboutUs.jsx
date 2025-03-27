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
        <main className="content-container">
         

          {/* About Section */}
          <div className="about-section">
            <h1>
              About <span ><span className="AboutUshighlight">Knot</span><span className="AboutUshighlight-pedia">pedia</span></span>
            </h1>
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
              <h1>Our Mission</h1>
              <p>
                At <strong>Knotpedia</strong>, we’re dedicated to making knot-tying accessible for everyone. Our platform offers easy-to-follow guides and tutorials for all skill levels, from beginners to experts.
              </p>
            </div>
            <div className="vision">
              <h1>Our Vision</h1>
              <p>
                At <strong>Knotpedia</strong>, we follow a vision to make knot-tying easier for everyone. Our platform offers easy-to-follow guides and tutorials for all skill levels, from beginners to experts.
              </p>
            </div>
          </div>

          {/* Policy Cards */}
          <div className="policy-cards">

            <div className="card" style={{ backgroundColor: '#0d6287' }}>
              <div className="icon">
                <img src="/assets/home-difficulty.png" alt="Difficulty Icon" />
              </div>
              <h4 className="blue title-card">Frequently Asked Questions (FAQs)</h4>
              <p>Find answers to common questions.</p>
            </div>
            <div className="card" style={{ backgroundColor: '#5192A5' }}><a href="/TermsAndConditions">
              <h4 className="blue">Terms & Conditions</h4>
              <p>Understand our site's rules and policies.</p></a>
           </div> 
            <div className="card" style={{ backgroundColor: '#b54d49' }}><a href="/PrivacyPolicy">
              <h4 className="red">Privacy Policy</h4>
              <p>Learn how we handle your data securely.</p></a>
            </div>
          </div>
        

        </main> 
         <Footer />
      </div>
    </div>
  );
};

export default AboutUs;
