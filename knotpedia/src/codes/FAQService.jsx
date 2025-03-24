import React from "react";

// Combined component that handles both the section and individual items
const FAQService = ({ title, questions, visibleAnswers, toggleAnswer }) => {
  return (
    <div className="faq-section">
      <h2>{title}</h2>
      <div className="faq-questions">
        {questions.map((q) => (
          <div className="faq-item" key={q.id}>
            <div className="faq-question" onClick={() => toggleAnswer(q.id)}>
              <div className="question-text">{q.question}</div>
              <div className="toggle-icon">
                {visibleAnswers[q.id] ? '-' : '+'}
              </div>
            </div>
            <div className={`faq-answer ${visibleAnswers[q.id] ? 'show' : ''}`}>
              {q.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQService;