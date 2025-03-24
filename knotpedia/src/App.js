import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./codes/Homepage.jsx";
import ContactUs from "./codes/ContactUs.jsx";
import AboutUs from "./codes/AboutUs.jsx";
import FAQ from "./codes/FAQ.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow p-4">
          {/* Main content goes here */}
          <Routes>
            <Route path="/" element={<Homepage />} />
            {/* <Route path="/contactus" element={<ContactUs />} /> Add Contact Us route */}
          
            <Route path="/contactus" element={<ContactUs />} /> {/* Add Contact Us route */}
            <Route path="/aboutus" element={<AboutUs />} /> {/* Add Contact Us route */}
            <Route path="/FAQ" element={<FAQ />} /> {/* Add FAQ route */}
          </Routes>

        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
