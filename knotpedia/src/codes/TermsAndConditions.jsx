import React from "react";
import "./TermsCondition.css";
//import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
const TermsAndConditions = () => {
  return (

    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="terms-POPPINS">
        {/* Breadcrumb */}
    <nav className="breadcrumb-terms">
            <a href="/Homepage">Home</a> &gt;<a href="/AboutUs">  About Us</a> &gt; <b>Terms And Conditions</b>
          </nav>


 <div className="Header-terms">
      <h1 className="terms-title">
        <strong className="Termsname-Title">Terms & </strong><span>Conditions</span>
      </h1>
      <p className="terms-text">
        By using Knotpedia, you agree to our guidelines on content usage, liability,
        and external links. Read our full terms here.
      </p></div>
 
    <div className="terms-container">
       
      
      <div className="space-y-4">
        <div className="terms-spacemargin">
        <section className="terms-section">
          <h2>1. Use of Content</h2>
          <ul className="terms-list">
            <li>All content on Knotpedia, including text, images, and videos, is for informational and educational purposes only.</li>
            <li>You may use our content for personal or non-commercial purposes, but you may not reproduce, distribute, or modify it without permission.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>2. No Liability for Knot Use</h2>
          <ul className="terms-list">
            <li>Knotpedia provides general knot-tying guides, but we do not guarantee their safety for critical applications such as climbing, rescue, or survival.</li>
            <li>You are responsible for ensuring knots are tied correctly and used appropriately for your specific needs.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>3. Suggestions, Not Submissions</h2>
          <ul className="terms-list">
            <li>Knotpedia does not accept user-submitted content, including tutorials, images, or videos.</li>
            <li>However, we welcome suggestions for new knots or improvements. If you have an idea, you can submit it through our <a href="/FAQ">FAQs</a> page.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>4. Changes to These Terms</h2>
          <ul className="terms-list">
            <li>We may update these Terms and Conditions at any time. Continued use of Knotpedia after changes means you accept the updated terms.</li>
          </ul>
        </section>
    


        
      </div>
      </div>
    </div>
    </div> 
    <Footer />
    </div>
  );
};

export default TermsAndConditions;
