import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../../../firebase.js";
import "../../Components/Tooltips.css";
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
                <div className="toggle-icon">
                  {visibleAnswers[q.id] ? "-" : "+"}
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

  // NEW: Form submission service
  submitFAQForm: async (formData) => {
    try {
      // Add document to Firestore collection
      const docRef = await addDoc(collection(db, "faq_inquiries"), {
        firstname: formData.firstname,
        // middlename: formData.middlename,  
        lastname: formData.lastname,
        email: formData.email,
        message: formData.message,
        createdAt: new Date(),
      });

      return {
        success: true,
        docRef: docRef,
        message: "Thank you! Your inquiry has been submitted successfully.",
      };
    } catch (error) {
      console.error("Error submitting FAQ form:", error);
      return {
        success: false,
        error: error,
        message:
          "Sorry, there was an error sending your message. Please try again.",
      };
    }
  },

  // NEW: Form component with submission logic
  FormComponent: () => {
    // State for form data
    const [formData, setFormData] = useState({
      firstname: "",
      // middlename: "", 
      lastname: "",
      email: "",
      message: "",
    });

    // State for form submission status
    const [submitStatus, setSubmitStatus] = useState({
      submitted: false,
      success: false,
      message: "",
    });

    // State for submission loading
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
      const { id, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      // Submit form using the service method
      const result = await FAQService.submitFAQForm(formData);

      // Update submission status
      setSubmitStatus({
        submitted: true,
        success: result.success,
        message: result.message,
      });

      // Reset form if successful
      if (result.success) {
        setFormData({
          firstname: "",
          // middlename: "", 
          lastname: "",
          email: "",
          message: "",
        });
      }

      setIsSubmitting(false);
    };

    // Reset status message after 5 seconds
    React.useEffect(() => {
      if (submitStatus.submitted) {
        const timer = setTimeout(() => {
          setSubmitStatus((prevState) => ({
            ...prevState,
            submitted: false,
          }));
        }, 5000);

        return () => clearTimeout(timer);
      }
    }, [submitStatus.submitted]);

    return (
      <>
        {/* Status Message */}
        {submitStatus.submitted && (
          <div
            className={`status-message ${submitStatus.success ? "success" : "error"
              }`}
          >
            {submitStatus.message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="firstname">
              First Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="Enter your first name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastname">
              Last Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Enter your last name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email Address <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message" className="tooltip">
              Write your question
              <span className="required">*</span>
              <span className="tooltiptext">This is required</span>
            </label>

            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message here"
              required
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
