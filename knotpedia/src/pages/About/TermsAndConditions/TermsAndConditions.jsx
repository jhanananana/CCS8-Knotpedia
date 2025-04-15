import React from "react";
import "./TermsAndConditions.css";
//import Footer from "./Footer.jsx";
import Navbar from "../../Components/Navbar.jsx";
import Footer from "../../Components/Footer.jsx";
const TermsAndConditions = () => {
  return (

    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div>

        <div className="subHeader redCover">
          <div className="container">
            <h1>Terms & Conditions</h1>
            <p>
              By using Knotpedia, you agree to our guidelines on content usage, liability,
              and external links. Read our full  here.
            </p>
          </div>
        </div>

        <div className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <a href="/" className="breadcrumb-link">
              <img src="/assets/home-icon.png" alt="Home Icon" />
              <span>Home</span>
            </a>
            &gt;
            <a href="/AboutUs">About Us</a>
            &gt;
            <span className="active">Terms & Conditions</span>
          </nav>

          <div>
            <div className="text-Container">
              <section className="sectionText red">
                <h3>1. Use of Content</h3>
                <ul className="list">
                  <li>All content on Knotpedia, including text, images, and videos, is for informational and educational purposes only.</li>
                  <li>You may use our content for personal or non-commercial purposes, but you may not reproduce, distribute, or modify it without permission.</li>
                </ul>
              </section>

              <section className="sectionText red">
                <h3>2. No Liability for Knot Use</h3>
                <ul className="list">
                  <li>Knotpedia provides general knot-tying guides, but we do not guarantee their safety for critical applications such as climbing, rescue, or survival.</li>
                  <li>You are responsible for ensuring knots are tied correctly and used appropriately for your specific needs.</li>
                </ul>
              </section>

              <section className="sectionText red">
                <h3>3. Suggestions, Not Submissions</h3>
                <ul className="list">
                  <li>Knotpedia does not accept user-submitted content, including tutorials, images, or videos.</li>
                  <li>However, we welcome suggestions for new knots or improvements. If you have an idea, you can submit it through our <a href="/FAQ">FAQs</a> page.</li>
                </ul>
              </section>

              <section className="sectionText red">
                <h3>4. Changes to These Terms</h3>
                <ul className="list">
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
