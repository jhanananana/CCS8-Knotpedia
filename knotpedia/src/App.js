import Navbar from "./codes/Navbar";
import Footer from "./codes/Footer";
import "./codes/Navbar.css";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-4">{/* Main content goes here */}</main>
      <Footer />
    </div>
  );
};

export default App;
