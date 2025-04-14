import React from "react";
import "./Sitemap.css";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";

const Sitemap = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="POPPINS-sitemap">
        {/* About Section */}
        <div className="subHeader blueCover">
          <div className="container">
            <h1><b>Site Map</b></h1>
            <p className="p-width">
              Looking for something specific? Explore our sitemap to easily navigate all our pages.
            </p>
          </div>
        </div>

        <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <a href="/" className="breadcrumb-link">
            <img src="/assets/home-icon.png" alt="Home Icon" />
            <span>Home</span>
          </a>
          &gt;
          <span className="active">Site Map</span>
        </nav>

          <main className="sitemap-content-container">
            {/* KNOTPEDIA */}
            <div className="sitemap-policy-cards">
              <div className="sitemap-card">
                <h4 className="sitemap-title-card">Knotpedia</h4>
                <ul className="sitemap-links">
                  <a href="/"><li className="siteColor">Home</li></a>
                  <a href="/"><li>About Us</li></a>
                  <a href="/"><li>Contact Us</li></a>
                  <a href="/"><li>Explore Knots</li></a>
                </ul>
              </div>

              {/* LEGAL */}
              <div className="sitemap-card">
                <h4 className="sitemap-blue">Legal</h4>
                <ul className="sitemap-links">
                  <a href="/"><li>FAQ</li></a>
                  <a href="/"><li>Terms And Conditions</li></a>
                  <a href="/"><li>Privacy Policy</li></a>
                </ul>
              </div>

              {/* SOCIAL MEDIA */}
              <div className="sitemap-card">
                <h4 className="sitemap-red">Social Media</h4>
                <ul className="sitemap-links">
                  <a href="/"><li>Facebook</li></a>
                  <a href="/"><li>Instagram</li></a>
                  <a href="/"><li>Youtube</li></a>
                </ul>
              </div>

              {/* EXPLORE KNOTS */}
              <div className="sitemap-card">
                <h4 className="sitemap-red">Explore Knots</h4>
                <ul className="sitemap-links">
                  <a href="/"><li>Knots by Activity</li></a>
                  <a href="/"><li>Knots by Type</li></a>
                  <a href="/"><li>Knots by Difficulty</li></a>
                </ul>
              </div>

              {/* KNOTS BY ACTIVITY */}
              <div className="sitemap-card">
                <h4 className="sitemap-red">Knots by Activity</h4>
                <ul className="sitemap-links">
                  <a href="/"><li>Arborist</li></a>
                  <a href="/"><li>Boating</li></a>
                  <a href="/"><li>Climbing</li></a>
                  <a href="/"><li>Fishing</li></a>
                  <a href="/"><li>Horse and Farm</li></a>
                </ul>
              </div>

              {/* KNOTS BY TYPE */}
              <div className="sitemap-card">
                <h4 className="sitemap-red">Knots by Type</h4>
                <ul className="sitemap-links">
                  <a href="/"><li>Basic</li></a>
                  <a href="/"><li>Bends</li></a>
                  <a href="/"><li>End Loop</li></a>
                  <a href="/"><li>Hitches</li></a>
                  <a href="/"><li>Maps</li></a>
                </ul>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Sitemap;
