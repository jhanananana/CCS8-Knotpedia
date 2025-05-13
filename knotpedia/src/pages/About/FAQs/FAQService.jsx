import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../../../firebase.js";
// Removed the tooltip import since we're replacing that functionality
// import "../../Components/Tooltips.css";

// Initialize Firestore
const db = getFirestore(app);

const FAQService = {
  // Existing FAQ questions rendering component
  QuestionList: ({ title, questions, visibleAnswers, toggleAnswer }) => {
    return (
      <div className="faq-section">
        <h2>{title}</h2>
        <div className="faq-questions">
          {questions.map((q) => (
            <div className="faq-item" key={q.id}>
              <div className="faq-question" onClick={() => toggleAnswer(q.id)}>
                <div className="question-text">{q.question}</div>
                <div className="toggle-iconfaq">
                  {visibleAnswers[q.id] ? "▲" : "▼"}
                </div>
              </div>
              <div
                className={`faq-answer ${visibleAnswers[q.id] ? "show" : ""}`}
              >
                {q.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },

  // Form submission service with improved error handling including timeout detection
  submitFAQForm: async (formData) => {
    try {
      const docRef = await addDoc(collection(db, "faq_inquiries"), {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        message: formData.message,
        createdAt: new Date(),
      });

      return {
        success: true,
        docRef: docRef,
        message: "Thank you! Your inquiry has been submitted successfully."
      };
    } catch (error) {
      console.error("Error submitting FAQ form:", error);
      
      // Different error messages based on error type
      let errorMessage = "Sorry, there was an error sending your message. Please try again.";
      
      // Check for specific error types - similar to ContactFormService
      if (error.code === 'unavailable' || error.message?.includes('network')) {
        errorMessage = "Network error. Please check your internet connection and try again.";
      } else if (error.code === 'resource-exhausted' || error.message?.includes('timeout')) {
        errorMessage = "Request timed out. Please try again later.";
      } else if (error.code === 'internal' || error.message?.includes('database')) {
        errorMessage = "Database connection error. Our team has been notified of this issue.";
      }
      
      return {
        success: false,
        error: error,
        message: errorMessage
      };
    }
  },

  // Modified FormComponent with timeout detection
  FormComponent: () => {
    const [formData, setFormData] = useState({
      firstname: "",
      lastname: "",
      email: "",
      message: "",
    });

    // Error state tracking
    const [errors, setErrors] = useState({
      firstname: "",
      lastname: "",
      email: "",
      message: "",
    });

    const [submitStatus, setSubmitStatus] = useState({
      submitted: false,
      success: false,
      message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const handleChange = (e) => {
      const { id, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
      
      // Clear error when user starts typing
      if (errors[id]) {
        setErrors(prev => ({
          ...prev,
          [id]: ""
        }));
      }
    };

    const validateForm = () => {
      let valid = true;
      const newErrors = { ...errors };
      
      // Field validation
      if (!formData.firstname.trim()) {
        newErrors.firstname = "Required";
        valid = false;
      }
      
      if (!formData.lastname.trim()) {
        newErrors.lastname = "Required";
        valid = false;
      }
      
      if (!formData.email.trim()) {
        newErrors.email = "Required";
        valid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email";
        valid = false;
      }
      
      if (!formData.message.trim()) {
        newErrors.message = "Required";
        valid = false;
      }
      
      setErrors(newErrors);
      return valid;
    };

    // Modified form submission handler with timeout detection
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      // Validate form before submission
      if (!validateForm()) {
        return false;
      }
      
      setIsSubmitting(true);

      try {
        // Set a timeout to detect if request takes too long
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('timeout')), 10000); // 10 seconds timeout
        });
        
        // Race the form submission against the timeout
        const result = await Promise.race([
          FAQService.submitFAQForm(formData),
          timeoutPromise
        ]);

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
            message: "",
          });
          setErrors({
            firstname: "",
            lastname: "",
            email: "",
            message: "",
          });
        }
      } catch (error) {
        // Handle specific error cases
        let errorMessage = "Sorry, there was an error sending your message. Please try again.";
        
        if (error.message === 'timeout') {
          errorMessage = "Request timed out. Please try again later.";
        } else if (error.message && error.message.includes('network')) {
          errorMessage = "Network error. Please check your internet connection and try again.";
        } else if (error.message && error.message.includes('database')) {
          errorMessage = "Database connection error. Our team has been notified of this issue.";
        }
        
        setSubmitStatus({
          submitted: true,
          success: false,
          message: errorMessage,
        });
        setIsPopupVisible(true);
      }

      setIsSubmitting(false);
    };

    // Auto-hide popup after 5 seconds
    React.useEffect(() => {
      if (isPopupVisible) {
        const timer = setTimeout(() => {
          setIsPopupVisible(false);
        }, 5000);

        return () => clearTimeout(timer);
      }
    }, [isPopupVisible]);

    return (
      <>
        {/* Popup Notification */}
        {isPopupVisible && (
          <div className="popup">
            <div className={`popup-content ${!submitStatus.success ? "error" : ""}`}>
              <div className={submitStatus.success ? "success-icon" : "error-icon"}>
                {submitStatus.success ? (
                  <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="20" fill="#4CAF50" />
                    <path d="M16 20.5L19 23.5L24 17.5" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="20" fill="#e04545" />
                    <path d="M15 15L25 25M15 25L25 15" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <p>{submitStatus.message}</p>
              <button
                onClick={() => setIsPopupVisible(false)}
                className={submitStatus.success ? "ok-popup" : "error-popup"}
              >
                OK
              </button>
            </div>
          </div>
        )}

        {/* Form with validation */}
        <form onSubmit={handleSubmit} className="contact-form" noValidate>
          <div className="form-group">
            <label htmlFor="firstname">
              First Name &nbsp;<span className="required">*</span>
              {errors.firstname && <span className="inline-error">{errors.firstname}</span>}
            </label>
            <input
              type="text"
              id="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="Enter your first name"
              className={errors.firstname ? "input-error" : ""}
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastname">
              Last Name &nbsp;<span className="required">*</span>
              {errors.lastname && <span className="inline-error">{errors.lastname}</span>}
            </label>
            <input
              type="text"
              id="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Enter your last name"
              className={errors.lastname ? "input-error" : ""}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email Address &nbsp;<span className="required">*</span>
              {errors.email && <span className="inline-error">{errors.email}</span>}
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className={errors.email ? "input-error" : ""}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">
              Write your question &nbsp;<span className="required">*</span>
              {errors.message && <span className="inline-error">{errors.message}</span>}
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your question here"
              className={errors.message ? "input-error" : ""}
            ></textarea>
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </>
    );
  },
};

export default FAQService;