import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer.jsx";
import Navbar from "../Components/Navbar.jsx";
import "./ContactUs.css";
import "../Components/DarkMode.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ContactFormService from "./ContactFormService.jsx"; 
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const ContactUs = () => {
  // State and tracks the values entered in the form fields
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    subject: "",
    message: "",
  });

  // stores validation error messeges for each field
  const [formErrors, setFormErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    subject: "",
    message: "",
  });

  // Track if form has been submitted at least once
  const [formSubmitted, setFormSubmitted] = useState(false);

  // State if the form submission was successful and display a message
  const [submitStatus, setSubmitStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  });

  // State for popup visibility 
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // State for loading indicator
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    // Clear error for this field when user starts typing
    if (formSubmitted) {
      validateField(id, value);
    }
  };

  // Validate a single field
  const validateField = (id, value) => {
    let error = "";

    if (!value.trim()) {
      error = "Required";
    } else if (id === "email" && !/\S+@\S+\.\S+/.test(value)) {
      error = "Invalid email";
    }

    setFormErrors(prev => ({
      ...prev,
      [id]: error
    }));

    return !error;
  };

  // Validate all form fields
  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Validate each field
    Object.keys(formData).forEach(key => {
      const value = formData[key];
      const fieldIsValid = validateField(key, value);
      if (!fieldIsValid) isValid = false;
    });

    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Validate all fields before submission
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    // Use the service to submit the form
    const result = await ContactFormService.submitContactForm(formData);

    // Handle the result
    setSubmitStatus({
      submitted: true,
      success: result.success,
      message: result.message,
    });

    // Show popup notification 
    setIsPopupVisible(true);

    // Reset form if successful
    if (result.success) {
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        subject: "",
        message: "",
      });
      setFormErrors({
        firstname: "",
        lastname: "",
        email: "",
        subject: "",
        message: "",
      });
      setFormSubmitted(false);
    }

    setIsSubmitting(false);
  };

  // Hide popup after 5 seconds
  useEffect(() => {
    if (isPopupVisible) {
      const timer = setTimeout(() => {
        setIsPopupVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isPopupVisible]);

  // Initialize Leaflet map
  useEffect(() => {
    let DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    const mapContainer = document.getElementById("location-map");
    if (mapContainer && !mapContainer.hasChildNodes()) {
      // Initialize Dumaguete City Coordinate
      const map = L.map("location-map").setView([9.3075, 123.308], 15);

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Add a marker for Hibbard Ave, Dumaguete City
      L.marker([9.3075, 123.308])
        .addTo(map)
        .bindPopup("Knotpedia<br>Hibbard Ave. Dumaguete City")
        .openPopup();
    }
  }, []);

  return (
    <div>
      <Navbar />
      {/* Popup Notification  */}
      {isPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <div className="success-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill="#4CAF50" />
                <path d="M16 20.5L19 23.5L24 17.5" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p>{submitStatus.message}</p>
            <button
              onClick={() => setIsPopupVisible(false)}
              className="ok-popup"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Page Header Section */}
      <header className="subHeader blueCover">
        <div className="container">
          <h1>Contact Us</h1>
          <p>
            We'd love to hear from you! Whether you need help with a knot
            tutorial, have a suggestion for new content, or want to report an
            issue, the <strong>Knotpedia</strong> team is here to assist you.
          </p>
        </div>
      </header>

      <main className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <a href="/" className="breadcrumb-link">
            <img src="/assets/home-icon.png" alt="Home Icon" title="Home" />
            <span>Home</span>
          </a>
          &gt;
          <span className="active">Contact Us</span>
        </nav>

        {/* Main Content - Two Column Layout */}
        <div className="two-column-layout">
          {/* Left Column - Contact Information */}
          <div className="contact-left-column">
            <h2 className="section-title">Contact Information</h2>
            <hr />

            {/* Phone Number Information */}
            <div className="info-item">
              <div className="icon-box">
                <span className="icon">
                  <img src="/assets/call.png" alt="Phone" title="Phone" />
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
                  <img src="/assets/address.png" alt="Email Address" title="Email Address" />
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
                  <img src="/assets/location.png" alt="Location" title="Location" />
                </span>{" "}
                {/* location icon */}
              </div>

              <div className="info-content">
                <p className="info-label">Our Location</p>
                <p className="info-value">
                  <span className="location-text">
                    Hibbard Ave. Dumaguete City,
                  </span>
                  <span className="location-text">Negros Oriental, 6200</span>
                </p>
              </div>
            </div>

            {/* Map Container */}
            <div className="map-container">
              {/* Replace the image with the Leaflet map */}
              <div
                id="location-map"
                style={{ height: "300px", width: "100%", borderRadius: "10px" }}
              ></div>
            </div>

            {/* Social Media Section */}
            <div className="social-section">
              <h2 className="section-title">
                Social Media
                <hr />
              </h2>
              <div className="social-icons">
                <a href="https://x.com/jjahnia" target="_blank" >
                  <div className="social-icon">
                    <img src="/assets/twitter.png" alt="Twitter/X" title="Twitter/X" />
                  </div>
                </a>
                {/* Twitter */}

                <a href="https://www.facebook.com/daone.datloveyou" target="_blank" >
                  <div className="social-icon">
                  <img src="/assets/facebook.png" alt="Facebook" title="Facebook" />
                </div></a>
                {/* Facebook */}

                <a href="https://www.instagram.com/vyn_tiq/" target="_blank" >
                <div className="social-icon "target="_blank" >
                  <img src="/assets/instagram.png" alt="Instagram" title="Instagram" />
                </div></a>
                {/* Instagram */}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="contact-right-column">
            <div className="message-form">
              <h2 className="form-title">Send us a message!</h2>
              <p className="form-subtitle">
                Whether you need help with a knot tutorial, have a suggestion
                for new content.
              </p>

              {/* Contact Form - Added noValidate attribute */}
              <form onSubmit={handleSubmit} noValidate>
                {/* Name Fields - Wrapped in a container */}
                <div className="name-fields">
                  <div className="form-group">
                    <label htmlFor="firstname">
                      First Name &nbsp;<span className="required">*</span>
                      {formErrors.firstname && <span className="error-text">{formErrors.firstname}</span>}
                    </label>
                    <input
                      type="text"
                      id="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      className={formErrors.firstname ? "input-error" : ""}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastname">
                      Last Name &nbsp;<span className="required">*</span>
                      {formErrors.lastname && <span className="error-text">{formErrors.lastname}</span>}
                    </label>
                    <input
                      type="text"
                      id="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      className={formErrors.lastname ? "input-error" : ""}
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="form-group">
                  <label htmlFor="email">
                    Email Address &nbsp;<span className="required">*</span>
                    {formErrors.email && <span className="error-text">{formErrors.email}</span>}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={formErrors.email ? "input-error" : ""}
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Subject Field */}
                <div className="form-group">
                  <label htmlFor="subject">
                    Subject &nbsp;<span className="required">*</span>
                    {formErrors.subject && <span className="error-text">{formErrors.subject}</span>}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={formErrors.subject ? "input-error" : ""}
                    placeholder="Your subject here"
                  />
                </div>

                {/* Message Field */}
                <div className="form-group">
                  <label htmlFor="message">
                    Message &nbsp;<span className="required">*</span>
                    {formErrors.message && <span className="error-text">{formErrors.message}</span>}
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={formErrors.message ? "input-error" : ""}
                    placeholder="Your message here"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Message"}
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