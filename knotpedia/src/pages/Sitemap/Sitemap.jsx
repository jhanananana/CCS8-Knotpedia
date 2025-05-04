import React from "react";
import "./Sitemap.css";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import { Link } from 'react-router-dom';
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
                  <Link to="/about"><li>About Us</li></Link>
                  <Link to="/contact"><li>Contact Us</li></Link>
                  <a href="/"><li>Explore Knots</li></a>
                </ul>
              </div>

              {/* LEGAL */}
              <div className="sitemap-card">
                <h4 className="sitemap-blue">Legal</h4>
                <ul className="sitemap-links">
                  <a href="/FAQs"><li>FAQ</li></a>
                  <a href="/termsandconditions"><li>Terms And Conditions</li></a>
                  <a href="/privacypolicy"><li>Privacy Policy</li></a>
                </ul>
              </div>

              {/* SOCIAL MEDIA */}
              <div className="sitemap-card">
                <h4 className="sitemap-red">Social Media</h4>
                <ul className="sitemap-links">
                  <a href="https://www.facebook.com/daone.datloveyou"><li>Facebook</li></a>
                  <a href="/"><li>Instagram</li></a>
                  <a href="/"><li>Youtube</li></a>
                </ul>
              </div>

              {/* EXPLORE KNOTS */}
              <div className="sitemap-card">
                <h4 className="sitemap-red">Explore Knots</h4>
                <ul className="sitemap-links">
                <Link to="/knots/activities"><li>Knots by Activity</li></Link>
                <Link to="/knots/types"><li>Knots by Type</li></Link>
                <Link to="/terminology"><li>Terminology</li></Link>

                </ul>
              </div>

              {/* KNOTS BY ACTIVITY */}
              <div className="sitemap-card">
                <h4 className="sitemap-red">Knots by Activity</h4>
                <ul className="sitemap-links">
                <Link to="/knots/activities/arborist"><li>Arborist</li></Link>
                <Link to="/knots/activities/boating"><li>Boating</li></Link>
                <Link to="/knots/activities/climbing"><li>Climbing</li></Link>
                <Link to="/knots/activities/fishing"><li>Fishing</li></Link>
                <Link to="/knots/activities/horse%20and%20farm"><li>Horse and Farm</li></Link>
                <Link to="/knots/activities/rope%20care"><li>Rope Care</li></Link>
                <Link to="/knots/activities/scouting"><li>Scouting</li></Link>
                <Link to="/knots/activities/search%20and%20rescue"><li>Search and Rescue</li></Link>
                <Link to="/knots/activities/surgical"><li>Surgical</li></Link>
                </ul>
              </div>

              {/* KNOTS BY TYPE */}
              <div className="sitemap-card">
                <h4 className="sitemap-red">Knots by Type</h4>
                <ul className="sitemap-links">
                <Link to="/knots/types/basic"><li>Basic</li></Link>
                <Link to="/knots/types/bends"><li>Bends</li></Link>
                <Link to="/knots/types/end%20loops"><li>End Loop</li></Link>
                <Link to="/knots/types/hitches"><li>Hitches</li></Link>
                <Link to="/knots/types/mats"><li>Mats</li></Link>
                <Link to="/knots/types/mid%20loops"><li>Mid Loop</li></Link>
                <Link to="/knots/types/quick%20release"><li>Quick Release</li></Link>
                <Link to="/knots/types/slide%20and%20grip"><li>Slide and Grip</li></Link>
                <Link to="/knots/types/splicing"><li>Splicing</li></Link>
                <Link to="/knots/types/stoppers"><li>Stoppers</li></Link>
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
