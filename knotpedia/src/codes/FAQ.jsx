import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FAQService from "./FAQService";
import "./FAQ.css";

const FAQ = () => {
  const generalQuestions = [
    {
      id: "question1",
      question: "Can I contribute or suggest knots to Knotpedia?",
      answer:
        "Currently, Knotpedia curates its content carefully, but suggestions for additional knots may be considered in future updates.",
    },
    {
      id: "question2",
      question: "Who can use Knotpedia?",
      answer:
        "Anyone interested in knots can use Knotpedia. Our platform is designed for both beginners and experienced users looking to learn about different types of knots and their applications.",
    },
    {
      id: "question3",
      question: "Is Knotpedia free to use?",
      answer:
        "Yes, Knotpedia is completely free to use. We believe knowledge about knots should be accessible to everyone without any barriers.",
    },
  ];

  const technicalQuestions = [
    {
      id: "question4",
      question: "How can I report an error or incorrect information?",
      answer:
        "If you find any errors or incorrect information on our site, please use the contact form at the bottom of this page. Include specific details about the error, and our team will review and correct it as soon as possible.",
    },
    {
      id: "question5",
      question: "How do I contact Knotpedia?",
      answer:
        "You can contact us using the form at the bottom of this page. Alternatively, you can reach us via email at support@knotpedia.com.",
    },
  ];

  // State to track which answers are visible
  const [visibleAnswers, setVisibleAnswers] = useState({
    question1: true, // First one open by default
    question2: false,
    question3: false,
    question4: false,
    question5: false,
  });

  // Function to toggle answer visibility
  const toggleAnswer = (questionId) => {
    setVisibleAnswers({
      ...visibleAnswers,
      [questionId]: !visibleAnswers[questionId],
    });
  };

  return (
    <div className="faq-container">
      {/* Navigation Bar */}
      <Navbar />

      {/*Breadcrumb */}
      <nav className="breadcrumb">
        <a href="/">Home</a> &gt; FAQ
      </nav>

      {/* Page Header Section */}
      <header className="FAQ-header">
        <h1>
          Frequently Asked <span className="red-text"> Questions</span>
        </h1>
        <p>
          Need help with something? Here are our most Frequently Asked Questions
        </p>
      </header>

      <div className="B-Main-Container">
        <FAQService
          title="General Questions"
          questions={generalQuestions}
          visibleAnswers={visibleAnswers}
          toggleAnswer={toggleAnswer}
        />

        <FAQService
          title="Technical & Contact"
          questions={technicalQuestions}
          visibleAnswers={visibleAnswers}
          toggleAnswer={toggleAnswer}
        />
      </div>

      <div className="B1-Main-Container">
        <div className="left-content-container">
          <h1>
            <span className="blue-text">In what way can we </span>
            <span className="red-text">help?</span>
          </h1>
          <p>Feel free to reach us with your inquiries!</p>
          <div className="image-placeholder"></div>
        </div>

        <div className="right-form-container">
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">
                Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
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
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="question">
                Write your question <span className="required">*</span>
              </label>
              <textarea
                id="question"
                name="question"
                placeholder="Type your message here"
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FAQ;
