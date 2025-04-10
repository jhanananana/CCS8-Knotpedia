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
          <h1 className="p-width"><b>Knot</b><b>Pedia</b> Site Map</h1>
          <p className="p-width">
          Looking for something specific? Explore our sitemap to easily navigate all our pages.
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
          <div className="sitemap-policy-cards">


            <div className="sitemap-card" style={{ backgroundColor: "#0d6287" }}>
              {/* <div className="icon">
                <img src="/assets/home-difficulty.png" alt="Difficulty Icon" />
              </div> */}
         
                <h4 className="sitemap-blue sitemap-title-card">Knotpedia </h4>
                <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Explore Knots</li>
                </ul>
           
            </div>

            <div className="card" style={{ backgroundColor: "#5192A5" }}>
          
                <h4 className="sitemap-blue">Legal</h4>
                <ul>
                <li>FAQ</li>
                <li>Terms And Conditions</li>
                <li>Privacy Policy</li>
                </ul>
           
            </div>

            <div className="sitemap-card" style={{ backgroundColor: "#b54d49" }}>
       
                <h4 className="sitemap-red">Social Media</h4>
                <ul>
                <li>Facebook</li>
                <li>Instagram</li>
                <li>Youtube</li>
                </ul>
            
            </div>
            <div className="sitemap-card" style={{ backgroundColor: "#b54d49" }}>
            
                <h4 className="sitemap-red">Social Media</h4>
                <ul>
                <li>Facebook</li>
                <li>Instagram</li>
                <li>Youtube</li>
                </ul>
              
            </div>

            <div className="sitemap-card" style={{ backgroundColor: "#b54d49" }}>
            
            <h4 className="sitemap-red">Explore Knots</h4>
            <ul>
               <li>Knots by Activity</li>
               <li>Knots by type</li>
               <li>Knots by Difficulty</li>
            </ul>
          
           </div>

           <div className="sitemap-card" style={{ backgroundColor: "#b54d49" }}>
            
            <h4 className="sitemap-red"> Knots by Activity</h4>
            <ul>
               <li>Arborist</li>
               <li>Boating</li>
               <li>Climbing</li>
               <li>Fishing</li>
               <li>Horse and Farm</li>
            </ul>
          
           </div>
           <div className="sitemap-card" style={{ backgroundColor: "#b54d49" }}>
            
            <h4 className="sitemap-red"> Knots by Type</h4>
            <ul>
               <li>Basic</li>
               <li>Bends</li>
               <li>End Loop</li>
               <li>Hitches</li>
               <li>Maps</li>
            </ul>
          
           </div>
           <div className="sitemap-card" style={{ backgroundColor: "#b54d49" }}>
            
            <h4 className="sitemap-red"> Knots by Difficulty</h4>
            <ul>
               <li>Easy</li>
               <li>Medium</li>
               <li>Hard</li>
            </ul>
          
           </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Sitemap;
