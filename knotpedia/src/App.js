import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./codes/Homepage.jsx";
import ContactUs from "./codes/ContactUs.jsx";
import AboutUs from "./codes/AboutUs.jsx";
import AllKnots from "./codes/AllKnots.jsx";
import FAQ from "./codes/FAQ.jsx";
import TermsAndConditions from "./codes/TermsAndConditions.jsx";
import PrivacyPolicy from "./codes/PrivacyPolicy.jsx";
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
            {/* <Route path="/sitemap" element={<SiteMap />} /> */}
            <Route path="/FAQ" element={<FAQ />} /> 
            <Route path="/termsandconditions" element={<TermsAndConditions/>} />
            {/* <Route path="/termsandconditions" element={<TermsConditions />} /> */}
            <Route path="/privacypolicy" element={<PrivacyPolicy />} /> 

            <Route path="/allknots" element={<AllKnots />} /> 
            {/* <Route path="/knotsbytype" element={<KnotsByType />} />  */}
            {/* <Route path="/knotsbydifficulty" element={<KnotsByDifficulty />} />  */}
            {/* <Route path="/knotsbyactivity" element={<KnotsByActivity />} /> */}

            {/* <Route path="/history" element={<History />} /> */}
            {/* <Route path="/safety" element={<Safety />} />*/}
          </Routes>

        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
