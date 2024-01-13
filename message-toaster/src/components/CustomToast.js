// CustomToast.js
import React, { useState, useEffect } from 'react';
import './CustomToast.css'; // Import or define your styles

const CustomToast = ({ id, message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    // Set timeout to close the toast after 7 seconds
    setTimer(
      setTimeout(() => {
        handleClose();
      }, 7000)
    );

    // Clear the timer when the component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, []); // Run only on mount

  const handleClose = () => {
    setIsVisible(false);
    // Call onClose to remove the toast from the list
    onClose(id);
  };

  const handleMouseEnter = () => {
    // Clear the timeout to prevent automatic hide
    clearTimeout(timer);
  };

  const handleMouseLeave = () => {
    // Restart the timer if the user leaves the toast
    const newTimer = setTimeout(() => {
      handleClose();
    }, 7000);

    // Assign the new timer value
    setTimer(newTimer);
  };

  return (
    <div
      className={`custom-toast ${isVisible ? 'visible' : 'hidden'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="toast-header">
        <strong className="mr-auto">Toast Message</strong>
        <div className="toast-body">{message}</div>
      </div>
      <button type="button" className="close" aria-label="Close" onClick={handleClose}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default CustomToast;
