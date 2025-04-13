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
          <span className="text-2xl font-bold text-gold">SD</span>
        </div>
      );
    }
    return (
      <img
        src="/logo192.png"
        alt="StrayDog Logo"
        className="h-12 w-12 object-contain"
        onError={handleLogoError}
      />
    );
  };

  const renderNameInput = () => (
    <form onSubmit={handleNameSubmit} className="w-full max-w-md">
      <div className="flex gap-2">
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="flex-1 bg-black border border-gold/30 rounded px-3 py-2 text-gold focus:outline-none focus:border-gold"
          required
        />
        <button
          type="submit"
          className="bg-gold text-black px-4 py-2 rounded hover:bg-gold-dark transition-colors"
        >
          Save
        </button>
      </div>
    </form>
  );

  const renderWelcomeMessage = () => (
    <div className="flex items-center gap-4">
      <h1 className="text-xl font-semibold">Welcome, {userName}!</h1>
      <button
        onClick={() => setShowNameInput(true)}
        className="text-gold/70 hover:text-gold transition-colors"
      >
        Change Name
      </button>
    </div>
  );

  return (
    <header className="bg-black border-b border-gold/30 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {renderLogo()}
            <div className="text-xl font-bold text-gold">StrayDog Todo List</div>
          </div>
          {showNameInput ? renderNameInput() : renderWelcomeMessage()}
        </div>
      </div>
    </header>
  );
}

export default Header; 