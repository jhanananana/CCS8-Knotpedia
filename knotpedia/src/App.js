import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./codes/Homepage.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow p-4">
          {/* Main content goes here */}
          <Routes>
            <Route path="/" element={<Homepage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
