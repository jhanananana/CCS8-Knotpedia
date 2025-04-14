import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Home/Homepage.jsx";
import ContactUs from "./pages/Contact/ContactUs.jsx";
import AboutUs from "./pages/About/AboutUs.jsx";
import Terminology from "./pages/Terminology/Terminology.jsx";
import AllKnots from "./pages/Categories/All/AllKnots.jsx";
import FAQ from "./pages/About/FAQs/FAQ.jsx";
import TermsAndConditions from "./pages/About/TermsAndConditions/TermsAndConditions.jsx";
import PrivacyPolicy from "./pages/About/PrivacyPolicy/PrivacyPolicy.jsx";
import Sitemap from "./pages/Sitemap/Sitemap.jsx";
import KnotChosen from "./pages/Tutorial/KnotChosen.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow p-4">
          {/* Main content goes here */}
          <Routes>
            <Route path="/" element={<Homepage />} />          
            <Route path="/contactus" element={<ContactUs />} /> {/* */}
            <Route path="/aboutus" element={<AboutUs />} /> {/* */}
            <Route path="/Terminology" element={<Terminology/>} /> 
             <Route path="/Sitemap" element={<Sitemap />} /> 
            <Route path="/FAQ" element={<FAQ />} /> 
            <Route path="/termsandconditions" element={<TermsAndConditions />} />
            {/* <Route path="/termsandconditions" element={<TermsConditions />} /> */}
            <Route path="/privacypolicy" element={<PrivacyPolicy />} /> 

            <Route path="/allknots" element={<AllKnots />} /> 
            {/* <Route path="/knotsbytype" element={<KnotsByType />} />  */}
            {/* <Route path="/knotsbydifficulty" element={<KnotsByDifficulty />} />  */}
            {/* <Route path="/knotsbyactivity" element={<KnotsByActivity />} /> */}
            
            <Route path="/KnotChosen/:id" element={<KnotChosen />} />
            {/* <Route path="/history" element={<History />} /> */}
            {/* <Route path="/safety" element={<Safety />} />*/}
          </Routes>

        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
