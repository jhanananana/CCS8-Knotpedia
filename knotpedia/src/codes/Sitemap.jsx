import React from "react";
import "./sitemap.css";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const Sitemap = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="POPPINS-sitemap">
        {/* About Section */}
        <div className="sitemap-header">
          <h1 className="p-width">Site Map</h1>
          <p className="p-width">
            At <strong>Knotpedia</strong>, we're dedicated to making knot-tying accessible for everyone. Our platform offers easy-to-follow guides and tutorials for all skill levels, from beginners to experts.
            Whether for outdoor activities or everyday use, we aim to help you master knots with confidence.
          </p>
        </div>

        <main className="sitemap-content-container">
          {/* Breadcrumb */}
          <nav className="sitemap-breadcrumb">
            <a href="/">Home</a> &gt; Site Map
          </nav>

   


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

export default Sitemap;
