import React, { createContext, useState, useEffect } from 'react';

const PreferencesContext = createContext();

export const PreferencesProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [colorFilter, setColorFilter] = useState(localStorage.getItem('colorFilter') || 'none');
    const [nightShift, setNightShift] = useState(localStorage.getItem('nightShift') === 'true' || false);

    useEffect(() => {
        console.log('Night Shift:', nightShift); // Debugging line

        applyPreferences();
    }, [theme, colorFilter, nightShift]);

    const applyPreferences = () => {
        document.documentElement.setAttribute('data-theme', theme);
    
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
    
        if (nightShift) {
            filter += ` sepia(80%) saturate(120%) brightness(90%) hue-rotate(40deg)`; // Night shift with enhanced warmth
        }
        
    
        // Apply the filter globally
        document.body.style.filter = filter;
    
        localStorage.setItem('theme', theme);
        localStorage.setItem('colorFilter', colorFilter);
        localStorage.setItem('nightShift', nightShift);
    };
    
    const resetPreferences = () => {
        setTheme('light');
        setColorFilter('none');
        setNightShift(false);
    };

    return (
        <PreferencesContext.Provider value={{
            theme, setTheme,
            colorFilter, setColorFilter,
            nightShift, setNightShift,
            resetPreferences
        }}>
            {/* SVG filters for color blindness simulations */}
            <svg style={{ position: 'absolute', height: 0, width: 0 }}>
                <defs>
                    <filter id="protanopia">
                        <feColorMatrix type="matrix" values="0.567,0.433,0,0,0 0.558,0.442,0,0,0 0,0.242,0.758,0,0 0,0,0,1,0" />
                    </filter>
                    <filter id="deuteranopia">
                        <feColorMatrix type="matrix" values="0.625,0.375,0,0,0 0.7,0.3,0,0,0 0,0.3,0.7,0,0 0,0,0,1,0" />
                    </filter>
                    <filter id="tritanopia">
                        <feColorMatrix type="matrix" values="0.95,0.05,0,0,0 0,0.433,0.567,0,0 0,0.475,0.525,0,0 0,0,0,1,0" />
                    </filter>
                </defs>
            </svg>

            {children}
        </PreferencesContext.Provider>
    );
};

export const usePreferences = () => React.useContext(PreferencesContext);
