import React, { useState, useEffect } from 'react';
import './Header.css';

function Header() {
  const [userName, setUserName] = useState('');
  const [showNameInput, setShowNameInput] = useState(true);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setUserName(savedName);
      setShowNameInput(false);
    }
  }, []);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    if (name) {
      setUserName(name);
      localStorage.setItem('userName', name);
      setShowNameInput(false);
    }
  };

  const handleLogoError = () => {
    setLogoError(true);
  };

  const renderLogo = () => {
    if (logoError) {
      return (
        <div className="logo-text">
          <span className="text-2xl">SD</span>
        </div>
      );
    }
    return (
      <img
        src="/logo192.png"
        alt="StrayDog Logo"
        className="h-12 w-12 object-contain rounded-full border-2 border-gold/30 hover:border-gold transition-colors"
        onError={handleLogoError}
      />
    );
  };

  const renderNameInput = () => (
    <form onSubmit={handleNameSubmit} className="w-full max-w-md animate-fade-in">
      <div className="flex gap-2">
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="name-input"
          required
        />
        <button type="submit" className="name-button">
          Save
        </button>
      </div>
    </form>
  );

  const renderWelcomeMessage = () => (
    <div className="welcome-container">
      <h1 className="welcome-text">Welcome, {userName}!</h1>
      <button
        onClick={() => setShowNameInput(true)}
        className="change-name-button"
      >
        Change Name
      </button>
    </div>
  );

  return (
    <header className="header-container">
      <div className="container">
        <div className="header-content">
          <div className="logo-container">
            {renderLogo()}
            <div className="app-title">StrayDog Todo List</div>
          </div>
          {showNameInput ? renderNameInput() : renderWelcomeMessage()}
        </div>
      </div>
    </header>
  );
}

export default Header;