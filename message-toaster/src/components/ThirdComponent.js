import React, { useState, useEffect } from 'react';

const ThirdComponent = () => {
  const [countdown, setCountdown] = useState(0);
  const [countdownStarted, setCountdownStarted] = useState(false);
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    if (countdown > 0 && countdownStarted) {
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
      }, 1000);

      return () => clearInterval(countdownInterval);
    }

    if (countdown === 0 && countdownStarted) {
      fetchData();
    }
  }, [countdown, countdownStarted]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.knowmee.co/api/v1/master/get-country-list');

      const data = await response.json();

      setCountries(data.responseData);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCountdownSubmit = (seconds) => {
    setCountdown(seconds);
    setCountdownStarted(true);

    setCountries([]);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(countries) ? countries.slice(indexOfFirstItem, indexOfLastItem) : [];

  return (
    <div>
      <h2>Third Component</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleCountdownSubmit(e.target.elements.seconds.value); }}>
        <label>
          Enter Countdown Seconds:
          <input type="number" name="seconds" />
        </label>
        <button type="submit">Start Countdown</button>
      </form>

      {countdownStarted && countdown > 0 && <p>Countdown: {countdown} seconds</p>}

      {countdown === 0 && countdownStarted && Array.isArray(countries) && (
        <>
          <h3>List of Countries</h3>
          <ul>
            {currentItems.map((country) => (
              <li key={country.country_id}>{country.country_name}</li>
            ))}
          </ul>

          <div>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Previous Page
            </button>
            <span> Page {currentPage} </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={indexOfLastItem >= countries.length}
            >
              Next Page
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ThirdComponent;
