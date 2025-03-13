import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import "./Homepage.css"; 

const Homepage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-4">
        {/* Header Section */}
        <header className="header">
            <h1>The <span className="blue-text">Ultimate</span> <span className="red-text">Knot</span> Guide</h1>
            <p>Explore Knotpedia, your go-to resource for learning and mastering 
                knots. Discover detailed guides, step-by-step tutorials, and 
                practical uses for various knots in everyday life, survival, 
                and specialized fields.</p>
                <button className="button blue">View All Knots</button>
        </header>

        <section className="section-features">
            <h1>Begin Your <span className="blue-text">Knot</span> <span 
            className="red-text">Journey</span></h1>

            <div className="box-container">
                <div className="box">
                    <div className="icon">
                        <img src="/assets/icon.png" alt="Circle Icon" />
                    </div>
                    <div className="main-text">
                        <span className="small-text">Knots by</span><br />
                        <span className="big-text">Activity</span>
                    </div>
                    <div className="sub-text">Find the perfect knot for any task!</div>
                </div>

                <div className="box">
                    <div className="icon">
                        <img src="/assets/icon.png" alt="Circle Icon" />
                    </div>
                    <div className="main-text">
                        <span className="small-text">Knots by</span><br />
                        <span className="big-text">Activity</span>
                    </div>
                    <div className="sub-text">Find the perfect knot for any task!</div>
                </div>

                <div className="box">
                    <div className="icon">
                        <img src="/assets/icon.png" alt="Circle Icon" />
                    </div>
                    <div className="main-text">
                        <span className="small-text">Knots by</span><br />
                        <span className="big-text">Activity</span>
                    </div>
                    <div className="sub-text">Find the perfect knot for any task!</div>
                </div>
            </div>

        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;

