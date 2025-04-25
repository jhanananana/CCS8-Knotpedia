import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import FAQService from "./FAQService";
import "./FAQ.css";

const FAQ = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const categories = [
    { id: "all", label: "All Questions" },
    { id: "general", label: "General" },
    { id: "technical", label: "Technical" }
  ];

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

      {/* Page Header Section */}
      <header className="subHeader blueCover">
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <p>
            Need help with something? Here are our most Frequently Asked Questions
          </p>
        </div>
      </header>

      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <a href="/" className="breadcrumb-link">
            <img src="/assets/home-icon.png" alt="Home Icon" />
            <span>Home</span>
          </a>
          &gt;
          <a href="/about">About Us</a>
          &gt;
          <span className="active">Frequently Asked Questions (FAQs)</span>
        </nav>

        <div className="question-container">
          <aside className="faq-sidebar">
            <div className="sidebarTitle" style={{ display: 'flex' }}>
              <div className="icon">
                <img src="/assets/faq-icon.png" style={{ width: '2rem' }} alt="Question Mark Icon" />
              </div>
              <h2>Categories</h2>
            </div>

            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id ? "active" : ""}
              >
                {category.label}
              </button>
            ))}
          </aside>

          <div className="faq-section">
            {(selectedCategory === "all" || selectedCategory === "general") && (
              <FAQService.QuestionList
                title="General Questions"
                questions={generalQuestions}
                visibleAnswers={visibleAnswers}
                toggleAnswer={toggleAnswer}
              />
            )}

            {(selectedCategory === "all" || selectedCategory === "technical") && (
              <FAQService.QuestionList
                title="Technical & Contact"
                questions={technicalQuestions}
                visibleAnswers={visibleAnswers}
                toggleAnswer={toggleAnswer}
              />
            )}
          </div>
          <div className="form-container">
            <div className="right-form-container">
              <h3>
                <span className="form-title">How can we </span>
                <span className="form-title red-text">help?</span>
              </h3>
              <p className="form-subtitle">Feel free to reach us with your inquiries!</p>
              <FAQService.FormComponent />
            </div>
          </div>
  
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>

  );
};

export default FAQ;