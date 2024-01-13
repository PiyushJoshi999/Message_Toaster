import React, {useState} from 'react';
import MyNavbar from './components/MyNavbar';
import FirstComponent from './components/FirstComponent';
import SecondComponent from './components/SecondComponent';
import ThirdComponent from './components/ThirdComponent';

const App = () => {
  const [selectedComponent, setSelectedComponent] = useState('first');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'first':
        return <FirstComponent />;
      case 'second':
        return <SecondComponent />;
      case 'third':
        return <ThirdComponent />;
      default:
        return null;
    }
  };

  return (
    <div>
      <MyNavbar onSelect={setSelectedComponent} />
      {renderComponent()}
    </div>
  );
};

export default App;
