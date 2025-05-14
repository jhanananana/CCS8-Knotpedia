import React from "react";
import "./Sitemap.css";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import { Link } from "react-router-dom";

const Sitemap = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="POPPINS-sitemap">
        <section className="subHeader blueCover">
          <div className="container">
            <h1><strong>Site Map</strong></h1>
            <p className="p-width">
              Looking for something specific? Explore our sitemap to easily navigate all our pages.
            </p>
          </div>
        </section>

        <div className="container">
          <nav className="breadcrumb" aria-label="breadcrumb">
            <Link to="/" className="breadcrumb-link">
              <img src="/assets/home-icon.png" alt="Home Icon" />
              <span>Home</span>
            </Link>
            &gt; <span className="active">Site Map</span>
          </nav>

          <main className="sitemap-content-container">
            <div className="sitemap-policy-cards">

              {/* Knotpedia Section */}
              <div className="sitemap-card">
                <h3 className="sitemap-title-card">Knotpedia</h3>
                <ul className="sitemap-links">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/contact">Contact Us</Link></li>
                  <li><Link to="/knots/all">Explore Knots</Link></li>
                </ul>
              </div>

              {/* Legal Section */}
              <div className="sitemap-card sitemap-blue">
                <h3>Legal</h3>
                <ul className="sitemap-links">
                  <li><Link to="/FAQs">Frequently Asked Questions (FAQs)</Link></li>
                  <li><Link to="/termsandconditions">Terms and Conditions</Link></li>
                  <li><Link to="/privacypolicy">Privacy Policy</Link></li>
                </ul>
              </div>

              {/* Social Media Section */}
              <div className="sitemap-card sitemap-red">
                <h3>Social Media</h3>
                <ul className="sitemap-links">
                  <li><a href="https://www.facebook.com/daone.datloveyou" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                  <li><a href="https://www.instagram.com/vyn_tiq/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                  <li><a href="https://x.com/jjahnia" target="_blank" rel="noopener noreferrer">Twitter/X</a></li>
                </ul>
              </div>

              {/* Explore Section */}
              <div className="sitemap-card sitemap-red">
                <h3>Explore Knots</h3>
                <ul className="sitemap-links">
                  <li><Link to="/knots/all">All Knots</Link></li>
                  <li><Link to="/knots/activities">Knots by Activity</Link></li>
                  <li><Link to="/knots/types">Knots by Type</Link></li>
                  <li><Link to="/glossary">Knots Glossary</Link></li>
                </ul>
              </div>

              {/* Knots by Activity Section */}
              <div className="sitemap-card sitemap-red">
                <h3>Knots by Activity</h3>
                <ul className="sitemap-links">
                  <li><Link to="/knots/activities/arborist">Arborist</Link></li>
                  <li><Link to="/knots/activities/boating">Boating</Link></li>
                  <li><Link to="/knots/activities/climbing">Climbing</Link></li>
                  <li><Link to="/knots/activities/fishing">Fishing</Link></li>
                  <li><Link to="/knots/activities/horse%20and%20farm">Horse and Farm</Link></li>
                  <li><Link to="/knots/activities/rope%20care">Rope Care</Link></li>
                  <li><Link to="/knots/activities/scouting">Scouting</Link></li>
                  <li><Link to="/knots/activities/search%20and%20rescue">Search and Rescue</Link></li>
                  <li><Link to="/knots/activities/surgical">Surgical</Link></li>
                </ul>
              </div>

              {/* Knots by Type Section */}
              <div className="sitemap-card sitemap-red">
                <h3>Knots by Type</h3>
                <ul className="sitemap-links">
                  <li><Link to="/knots/types/basic">Basic</Link></li>
                  <li><Link to="/knots/types/bends">Bends</Link></li>
                  <li><Link to="/knots/types/end%20loops">End Loop</Link></li>
                  <li><Link to="/knots/types/hitches">Hitches</Link></li>
                  <li><Link to="/knots/types/mats">Mats</Link></li>
                  <li><Link to="/knots/types/mid%20loops">Mid Loop</Link></li>
                  <li><Link to="/knots/types/quick%20release">Quick Release</Link></li>
                  <li><Link to="/knots/types/slide%20and%20grip">Slide and Grip</Link></li>
                  <li><Link to="/knots/types/splicing">Splicing</Link></li>
                  <li><Link to="/knots/types/stoppers">Stoppers</Link></li>
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
