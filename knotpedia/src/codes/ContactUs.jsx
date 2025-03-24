import React, { useEffect, useState } from "react";
import Footer from "./Footer.jsx";
import Navbar from "./Navbar";
import "./ContactUs.css";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ContactFormService from "./ContactFormService"; // Import the form service

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';



const ContactUs = () => {

  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  // State for form submission status
  const [submitStatus, setSubmitStatus] = useState({
    submitted: false,
    success: false,
    message: ""
  });
  
  // State for loading indicator
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Use the service to submit the form
    const result = await ContactFormService.submitContactForm(formData);
    
    // Handle the result
    setSubmitStatus({
      submitted: true,
      success: result.success,
      message: result.message
    });
    
    // Reset form if successful
    if (result.success) {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }
    
    setIsSubmitting(false);
  };



  useEffect(() => {
    // Default icon issue fix
    let DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41]
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    const mapContainer = document.getElementById('location-map');
    if (mapContainer && !mapContainer.hasChildNodes()) {
      // Initialize Dumaguete City Coordinate
      const map = L.map('location-map').setView([9.3075, 123.3080], 15);
      
      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
 
      // Add a marker for Hibbard Ave, Dumaguete City
      L.marker([9.3075, 123.3080])
        .addTo(map)
        .bindPopup('Knotpedia<br>Hibbard Ave. Dumaguete City')
        .openPopup();
    }
  }, []);

  // Reset status message after 5 seconds
  useEffect(() => {
    if (submitStatus.submitted) {
      const timer = setTimeout(() => {
        setSubmitStatus(prevState => ({
          ...prevState,
          submitted: false
        }));
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [submitStatus.submitted]);
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation bar component */}
      <Navbar />

      {/* Breadcrumb */}
      <nav className="breadcrumb">
          <a href="/">Home</a> &gt; Contact Us
      </nav>


      <main className="content-container">
        
        {/* Page Header Section */}                                                                                   
        <header className="contact-header">
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
                <span className="icon">
                <img src="/assets/call.png" alt="call" />
                  </span> 
              </div>
              <div className="info-content">
                <p className="info-label">Phone Number</p>
                <p className="info-value1">1234567890</p>
              </div>
            </div>
            
            {/* Email Address Information */}
            <div className="info-item">
              <div className="icon-box">
                <span className="icon">
                <img src="/assets/address.png" alt="address" />
                  </span> 
              </div>
              <div className="info-content">
                <p className="info-label">Email Address</p>
                <p className="info-value">knotpedia@gmail.com</p>
              </div>
            </div>
            
            {/* Location Information */}
            <div className="info-item">
              <div className="icon-box">
                <span className="icon">
                  <img src="/assets/location.png" alt="location" />
                  </span> {/* location icon */}
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
              {/* Replace the image with the Leaflet map */}
              <div id="location-map" style={{ height: '300px', width: '100%', borderRadius: '10px' }}></div>
            </div>
            
            {/* Social Media Section */}
            <div className="social-section">
              <h2 className="section-title">Social Media</h2>
              <div className="social-icons">
                {/* TODO:kulang pa icons */}
                <div className="social-icon">
                    <img src="/assets/facebook.png" alt="Facebook" />
                </div> {/* Facebook */}

                <div className="social-icon">
                  <img src="/assets/instagram.png" alt="instagram" />
                  </div> {/* Instagram */}

                <div className="social-icon">
                  <img src="/assets/twitter.png" alt="twitter" />
                  </div> {/* Twitter */}

              </div>
            </div>
          </div>
          
          {/* Right Column - Contact Form */}
          <div className="right-column">
            <div className="message-form">
              <h2 className="form-title">Send us a message!</h2>
              <p className="form-subtitle">Whether you need help with a knot tutorial, have a suggestion for new content.</p>
              
              {/* Status Message */}
              {submitStatus.submitted && (
                <div className={`status-message ${submitStatus.success ? 'success' : 'error'}`}>
                  {submitStatus.message}
                </div>
              )}

              {/* Contact Form */}
              <form onSubmit={handleSubmit}>
                {/* Name Field */}
                <div className="form-group">
                  <label htmlFor="name">Name <span className="required">*</span></label>
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                {/* Email Field */}
                <div className="form-group">
                  <label htmlFor="email">Email Address <span className="required">*</span></label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                {/* Subject Field */}
                <div className="form-group">
                  <label htmlFor="subject">Subject <span className="required">*</span></label>
                  <input 
                    type="text" 
                    id="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                {/* Message Field */}
                <div className="form-group">
                  <label htmlFor="message">Message <span className="required">*</span></label>
                  <textarea 
                    id="message" 
                    rows="5" 
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
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