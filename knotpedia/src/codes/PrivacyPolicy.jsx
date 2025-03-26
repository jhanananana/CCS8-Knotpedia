import React from "react";
import "./PrivacyPolicy.css";
//import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const PrivacyPolicy = () => {
  return (

    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="policy-POPPINS">
        {/* Breadcrumb */}
    <nav className="breadcrumb-policy">
            <a href="/Homepage">Home</a> &gt;<a href="/AboutUs">  About Us</a> &gt; <b>Privacy Policy</b>
          </nav>


 <div className="Header-policy">
      <h1 className="policy-title">
        <strong className="policyname-Title">Privacy </strong><span>Policy</span>
      </h1>
      <p className="policy-text">
      We respect your privacy. Learn how we handle emails 
      and website data while keeping your information secure.
      </p></div>
 
    <div className="policy-container">
       
      
      <div className="space-y-4">
        <div className="policy-spacemargin">
        <section className="policy-section">
          <h2>1. Information We Collect</h2>
          <ul className="policy-list">
            <li>Emails: If you contact us with a suggestion or question, we collect your email address to respond to your inquiry.</li>
             </ul>
        </section>

        <section className="policy-section">
          <h2>2. How We Use Your Information</h2>
          <ul className="policy-list">
             <li>To respond to your suggestions or questions.</li>
             <li>To analyze website traffic and improve our content.</li> 
             <li>We do not sell, rent, or share your personal information with third parties.</li>
             </ul>
        </section>

        <section className="policy-section">
          <h2>3. Data Security</h2>
          <ul className="policy-list">
            <li>We take reasonable measures to protect any collected information. 
                However, no online platform is 100% secure.</li>
            </ul>
        </section>

        <section className="policy-section">
          <h2>4. Changes to These policy</h2>
          <ul className="policy-list">
            <li>We may update this policy as needed. 
                Continued use of Knotpedia after updates means you accept the revised policy.</li>
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

export default PrivacyPolicy;
