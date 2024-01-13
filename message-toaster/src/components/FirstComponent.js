import React, { useState } from 'react';
import CustomToast from './CustomToast';

const FirstComponent = () => {
  const [toasts, setToasts] = useState([]);
  const [counter, setCounter] = useState(1);
  const [customTimeout, setCustomTimeout] = useState(7000); 

  const handleShowToast = () => {
    const newToast = {
      id: new Date().getTime(),
      message: `Testing Toast: ${counter}`,
    };

    if (toasts.length < 3) {
      setToasts((prevToasts) => [...prevToasts, newToast]);
    } else {
      setToasts((prevToasts) => [...prevToasts.slice(1), newToast]);
    }

    setCounter((prevCounter) => prevCounter + 1);

    setTimeout(() => {
      handleCloseToast(newToast.id);
    }, customTimeout);
  };

  const handleCloseToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const handleSetTimeout = () => {
    
    const timeoutValue = parseInt(window.prompt('Enter custom timeout in milliseconds:', customTimeout), 10);
    
    if (!isNaN(timeoutValue)) {
      setCustomTimeout(timeoutValue);
    }
  };

  return (
    <div>
      <h2>First Component</h2>
      <button onClick={handleShowToast}>Show Toast Message</button>
      <button onClick={handleSetTimeout}>Set Timeout</button>

      <div className="toast-container">
        {toasts.map((toast) => (
          <CustomToast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            onClose={handleCloseToast}
          />
        ))}
      </div>
    </div>
  );
};

export default FirstComponent;
