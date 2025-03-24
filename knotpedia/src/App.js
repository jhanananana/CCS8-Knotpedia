import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./codes/Homepage.jsx";
import ContactUs from "./codes/ContactUs.jsx";
import AboutUs from "./codes/AboutUs.jsx";
const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow p-4">
          {/* Main content goes here */}
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/contactus" element={<ContactUs />} /> Add Contact Us route
          
          </Routes>

        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
