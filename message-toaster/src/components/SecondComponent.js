
import React, { useState } from 'react';
import CustomToast from './CustomToast';

const SecondComponent = () => {
  const [customToast, setCustomToast] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [customTimeout, setCustomTimeout] = useState(7000);

  const handleShowCustomizedToast = () => {
    if (customToast.trim() !== '') {
      setIsToastVisible(true);

      setTimeout(() => {
        setIsToastVisible(false);
      }, 7000);
    }
  };

  const handleSetTimeout = () => {
   
    const timeoutValue = parseInt(window.prompt('Enter custom timeout in milliseconds:', customTimeout), 10);
    
    if (!isNaN(timeoutValue)) {
      setCustomTimeout(timeoutValue);
    }
  };

  const handleCloseCustomizedToast = () => {
    setIsToastVisible(false);
  };

  return (
    <div>
      <h2>Enter Custom Toast Text</h2>
      <form>
        <label>
          Custom Toast Message:
          <input
            type="text"
            value={customToast}
            onChange={(e) => setCustomToast(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleShowCustomizedToast}>
          Show Customized Toast Message
        </button>
        <button onClick={handleSetTimeout}>Set Timeout</button>
      </form>

      {isToastVisible && (
        <CustomToast
          id={new Date().getTime()}
          message={customToast}
          onClose={handleCloseCustomizedToast}
        />
      )}
    </div>
  );
};

export default SecondComponent;
