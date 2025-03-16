import React from "react";
import Footer from "./Footer.jsx";
import Navbar from "./Navbar";
import "./ContactUs.css";

const ContactUs = () => {
    return (
      <div className="flex flex-col min-h-screen">
        {/* Navigation bar component */}
        <Navbar />
        
        <main className="content-container">
          {/* Page Header Section */}                                                                                   
          <header className="header">
            <h1><span className="blue-text">Contact</span> Us</h1>
            <p>We'd love to hear from you! Whether you need help with a knot tutorial, have a 
            suggestion for new content, or want to report an issue, the <strong>Knotpedia</strong> team is here to 
            assist you.</p>
          </header>
  
          {/* Main Content - Two Column Layout */}
          <div className="two-column-layout">
            {/* Left Column - Contact Information */}
            <div className="left-column">
              <h2 className="section-title">Contact Information</h2>
              
              {/* Phone Number Information */}
              <div className="info-item">
                <div className="icon-box">
                  <span className="icon">⚪</span> {/* TODO:kulang pa icons */}
                </div>
                <div className="info-content">
                  <p className="info-label">Phone Number</p>
                  <p className="info-value">1234567890</p>
                </div>
              </div>
              
              {/* Email Address Information */}
              <div className="info-item">
                <div className="icon-box">
                  <span className="icon">⚪</span> {/* TODO:kulang pa icons */}
                </div>
                <div className="info-content">
                  <p className="info-label">Email Address</p>
                  <p className="info-value blue-text">knotpedia@gmail.com</p>
                </div>
              </div>
              
              {/* Location Information */}
              <div className="info-item">
                <div className="icon-box">
                  <span className="icon">⚪</span> {/* TODO:kulang pa icons */}
                </div>
                <div className="info-content">
                  <p className="info-label">Our Location</p>
                  <p className="info-value">
                    <span className="location-text">Hibbard Ave. Dumaguete City,</span>
                    <span className="location-text">Negros Oriental, 6200</span>
                  </p>
                </div>
              </div>
              
              {/* Map Container */}
              <div className="map-container">
                {/* TODO: kulang map */}
                <img src="/placeholder-map.jpg" alt="Location Map" />
              </div>
              
              {/* Social Media Section */}
              <div className="social-section">
                <h2 className="section-title">Social Media</h2>
                <div className="social-icons">
                  {/* TODO:kulang pa icons */}
                  <div className="social-icon">⚪</div> {/* Facebook */}
                  <div className="social-icon">⚪</div> {/* Instagram */}
                  <div className="social-icon">⚪</div> {/* Twitter */}
                </div>
              </div>
            </div>
            
            {/* Right Column - Contact Form */}
            <div className="right-column">
              <div className="message-form">
                <h2 className="form-title">Send us a message!</h2>
                <p className="form-subtitle">Whether you need help with a knot tutorial, have a suggestion for new content.</p>
                
                {/* Contact Form */}
                <form>
                  {/* Name Field */}
                  <div className="form-group">
                    <label htmlFor="name">Name <span className="required">*</span></label>
                    <input type="text" id="name" required />
                  </div>
                  
                  {/* Email Field */}
                  <div className="form-group">
                    <label htmlFor="email">Email Address <span className="required">*</span></label>
                    <input type="email" id="email" required />
                  </div>
                  
                  {/* Subject Field */}
                  <div className="form-group">
                    <label htmlFor="subject">Subject <span className="required">*</span></label>
                    <input type="text" id="subject" required />
                  </div>
                  
                  {/* Message Field */}
                  <div className="form-group">
                    <label htmlFor="message">Message <span className="required">*</span></label>
                    <textarea id="message" rows="5" required></textarea>
                  </div>
                  
                  {/* Submit Button */}
                  <button type="submit" className="submit-button">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </main>
        
       
        <Footer />
      </div>
    );
  };
  
  export default ContactUs;