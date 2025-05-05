import { useState, useEffect } from 'react';
import "./BackToTop.css";
import { Tooltip } from 'react-tooltip'// Tooltip Import
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 100); // show after 100px
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <button
        className={`back-to-top ${visible ? 'show' : ''}`}
        onClick={scrollToTop}
        title="Back to Top"
      >
        <img src="/assets/backtotop.png" alt='Back to Top'></img>

      </button>   
      <Tooltip id="my-tooltip" />
    </>
    
   
    
  );
}

export default BackToTop;
