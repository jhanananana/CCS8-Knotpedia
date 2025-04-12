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
          <h1 className="p-width site-title"><b >KnotPedia Site Map</b> </h1>
          <p className="p-width">
          Looking for something specific? Explore our sitemap to easily navigate all our pages.
          </p>
        </div>

        <main className="sitemap-content-container">
       
        
      
          {/* Policy Cards */}
          <div className="sitemap-policy-cards">


            <div className="sitemap-card" style={{ backgroundColor: "#F2F2F2" }}>
              {/* <div className="icon">
                <img src="/assets/home-difficulty.png" alt="Difficulty Icon" />
              </div> */}
         
                <h4 className=" sitemap-title-card">Knotpedia </h4>
                <ul>
               <a href="/"> <li className=" siteColor">Home</li></a>
               <a href="/AboutUs"><li className="siteColor">About Us</li></a> 
                <a href="/ContactUs"><li className="siteColor">Contact Us</li></a>
                <a href="/"><li className="siteColor">Explore Knots</li></a>
                </ul>
           
            </div>

            <div className="sitemap-card" style={{ backgroundColor: "#F2F2F2" }}>
          
                <h4 className="sitemap-blue">Legal</h4>
                <ul>
                <a href="/FAQ"> <li className="siteColor">FAQ</li></a>
                <a href="/TermsAndConditions"><li className="siteColor">Terms And Conditions</li></a>
                <a href="/PrivacyPolicy"><li className="siteColor">Privacy Policy</li></a>
                </ul>
           
            </div>

            <div className="sitemap-card" style={{ backgroundColor: "#F2F2F2" }}>
       
                <h4 className="sitemap-red">Social Media</h4>
                <ul>
                <li className="siteColor">Facebook</li>
                <li className="siteColor">Instagram</li>
                <li className="siteColor">Youtube</li>
                </ul>
            
            </div>
            <div className="sitemap-card" style={{ backgroundColor: "#F2F2F2" }}>
            
                <h4 className="sitemap-red">Social Media</h4>
                <ul>
                <li className="siteColor">Facebook</li>
                <li className="siteColor">Instagram</li>
                <li className="siteColor">Youtube</li>
                </ul>
              
            </div>

            <div className="sitemap-card" style={{ backgroundColor: "#F2F2F2" }}>
            
            <h4 className="sitemap-red">Explore Knots</h4>
            <ul>
               <li className="siteColor">Knots by Activity</li>
               <li className="siteColor">Knots by type</li>
               <li className="siteColor">Knots by Difficulty</li>
            </ul>
          
           </div>

           <div className="sitemap-card" style={{ backgroundColor: "#F2F2F2" }}>
            
            <h4 className="sitemap-red"> Knots by Activity</h4>
            <ul>
               <li className="siteColor">Arborist</li>
               <li className="siteColor">Boating</li>
               <li className="siteColor">Climbing</li>
               <li className="siteColor">Fishing</li>
               <li className="siteColor">Horse and Farm</li>
            </ul>
          
           </div>
           <div className="sitemap-card" style={{ backgroundColor: "#F2F2F2" }}>
            
            <h4 className="sitemap-red"> Knots by Type</h4>
            <ul>
               <li className="siteColor">Basic</li>
               <li className="siteColor">Bends</li>
               <li className="siteColor">End Loop</li>
               <li className="siteColor">Hitches</li>
               <li className="siteColor">Maps</li>
            </ul>
          
           </div>
           <div className="sitemap-card" style={{ backgroundColor: "#F2F2F2" }}>
            
            <h4 className="sitemap-red"> Knots by Difficulty</h4>
            <ul>
               <li className="siteColor">Easy</li>
               <li className="siteColor">Medium</li>
               <li className="siteColor">Hard</li>
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
