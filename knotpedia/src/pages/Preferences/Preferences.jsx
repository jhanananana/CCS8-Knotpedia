import "./Preferences.css";
import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";

const Preferences = () => {
    // Theme state
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    // Color filter states
    const [colorFilter, setColorFilter] = useState(localStorage.getItem('colorFilter') || 'none');
    const [nightShift, setNightShift] = useState(localStorage.getItem('nightShift') === 'true' || false);

    // Apply preferences on mount and when they change
    useEffect(() => {
        applyPreferences();
    }, [theme, colorFilter, nightShift]);

    const applyPreferences = () => {
        // Apply theme
        document.documentElement.setAttribute('data-theme', theme);

        // Apply color filter globally
        let filter = '';
        switch (colorFilter) {
            case 'grayscale':
                filter = `grayscale(100%)`;
                break;
            case 'protanopia':
                filter = `url(#protanopia)`;
                break;
            case 'deuteranopia':
                filter = `url(#deuteranopia)`;
                break;
            case 'tritanopia':
                filter = `url(#tritanopia)`;
                break;
            default:
                filter = 'none';
        }

        // Apply night shift if enabled
   
        if (nightShift) {
            filter += ` sepia(80%) saturate(120%) brightness(90%) hue-rotate(40deg)`; // Night shift with enhanced warmth
        }
        

        // Apply the filter globally
        document.documentElement.style.setProperty('--filter', filter);

        // Save to localStorage
        localStorage.setItem('theme', theme);
        localStorage.setItem('colorFilter', colorFilter);
        localStorage.setItem('nightShift', nightShift);
    };

    const resetPreferences = () => {
        setTheme('light');
        setColorFilter('none');
        setNightShift(false);
        window.location.reload();
    };

    return (
        <div>
            <Navbar />
            <header className="subHeader redCover">
                <div className="container">
                    <h1>Preferences</h1>
                    <p>Customize your Knotpedia experience</p>
                </div>
            </header>

            <div className="container">
                {/* Breadcrumb */}
                <nav className="breadcrumb">
                    <a href="/" className="breadcrumb-link">
                        <img src="/assets/home-icon.png" alt="Home Icon" title="Home"/>
                        <span>Home</span>
                    </a>
                    &gt;
                    <span className="active">Preferences</span>
                </nav>
            </div>


            <div className="container types-layout">

                <main className="content-area">
                    <div className="category-title">
                        <h2>Display Settings</h2>
                    </div>

                    <div className="preferences-container">
                        {/* Theme Selection */}
                        <div className="preference-section">
                            <h3>Theme</h3>
                            <div className="theme-options">
                                <div
                                    className={`theme-option ${theme === 'light' ? 'active' : ''}`}
                                    onClick={() => setTheme('light')}
                                >
                                    <div className="theme-preview light"></div>
                                    <span>Light</span>
                                </div>
                                <div
                                    className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
                                    onClick={() => setTheme('dark')}
                                >
                                    <div className="theme-preview dark"></div>
                                    <span>Dark</span>
                                </div>
                            </div>
                        </div>

                        {/* Color Filters */}
                        <div className="preference-section">
                            <h3>Color Filters</h3>
                            <p>Adjust colors for better visibility</p>

                            <div className="filter-options">
                                <select
                                    value={colorFilter}
                                    onChange={(e) => setColorFilter(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="none">No filter</option>
                                    <option value="grayscale">Grayscale</option>
                                    <option value="protanopia">Protanopia (red/green)</option>
                                    <option value="deuteranopia">Deuteranopia (green/red)</option>
                                    <option value="tritanopia">Tritanopia (blue/yellow)</option>
                                </select>
                            </div>
                        </div>

                        {/* Night Shift */}
                        {/* <div className="preference-section">
                            <h3>Night Shift</h3>
                            <p>Reduce blue light for nighttime viewing</p>

                            <div className="toggle-option">
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={nightShift}
                                        onChange={(e) => setNightShift(e.target.checked)}
                                    />
                                    <span className="slider round"></span>
                                </label>
                                <span>{nightShift ? 'Enabled' : 'Disabled'}</span>
                            </div>
                        </div> */}

                        {/* Reset Button */}
                        <div className="preference-actions">
                            <button
                                className="button red"
                                onClick={resetPreferences}
                            >
                                Reset to Defaults
                            </button>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Preferences;
