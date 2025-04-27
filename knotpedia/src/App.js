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
import Search from "./pages/Search/Search.jsx";
import Types from "./pages/Categories/Types/Types.jsx";
import FirebaseDataEntry from "./pages/FirebaseDataEntry.jsx";
import BackToTop from "./pages/Components/BackToTop.jsx";
import Activities from "./pages/Categories/Activities/Activities.jsx";
const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow p-4">
          {/* Main content goes here */}
          <Routes>
            <Route path="/" element={<Homepage />} />          
            <Route path="/contact" element={<ContactUs />} /> {/* */}
            <Route path="/about" element={<AboutUs />} /> {/* */}
            <Route path="/terminology" element={<Terminology/>} /> 
             <Route path="/sitemap" element={<Sitemap />} /> 
            <Route path="/FAQs" element={<FAQ />} /> 
            <Route path="/termsandconditions" element={<TermsAndConditions />} />
            {/* <Route path="/termsandconditions" element={<TermsConditions />} /> */}
            <Route path="/privacypolicy" element={<PrivacyPolicy />} /> 

            <Route path="/knots/all" element={<AllKnots />} /> 
            <Route path="/knots/types" element={<Types />} /> 
            <Route path="/knots/activities" element={<Activities />} />
            
            <Route path="/knot/:name" element={<KnotChosen />} />
            {/* <Route path="/history" element={<History />} /> */}
            {/* <Route path="/safety" element={<Safety />} />*/}

            <Route path="/search" element={<Search />} />

            <Route path="/FirebaseDataEntry" element={<FirebaseDataEntry />} />
            <Route path="/knots/types/:type?" element={<Types />} />
            <Route path="/knots/activities/:activity?" element={<Activities />} />

          </Routes>
          <BackToTop />

        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
