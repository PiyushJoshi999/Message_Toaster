// Navbar.js

import React from 'react';

const MyNavbar = ({ onSelect }) => {
  return (
    <nav>
      <h1>Message Toaster</h1>
      <ul>
        <li onClick={() => onSelect('first')}>FirstComponent</li>
        <li onClick={() => onSelect('second')}>SecondComponent</li>
        <li onClick={() => onSelect('third')}>ThirdComponent</li>
      </ul>
    </nav>
  );
};

export default MyNavbar;
