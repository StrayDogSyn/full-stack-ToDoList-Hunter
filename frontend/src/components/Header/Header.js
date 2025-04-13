import React, { useState, useEffect } from 'react';
import './Header.css';
import tlmLogo from '../../assets/The Last Mile LOGO R 4 HORIZONTAL White No Tagline.png';

function Header() {
  const [userName, setUserName] = useState('');
  const [showNameInput, setShowNameInput] = useState(true);

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

  const renderNameInput = () => (
    <form onSubmit={handleNameSubmit} className="w-full max-w-md animate-fade-in">
      <div className="flex gap-3">
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary text-neutral placeholder-neutral/50 transition-all"
          required
        />
        <button 
          type="submit" 
          className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:shadow-glow transition-all duration-300"
        >
          Save
        </button>
      </div>
    </form>
  );

  const renderWelcomeMessage = () => (
    <div className="flex items-center gap-4 animate-fade-in">
      <h1 className="text-xl text-gradient-accent">Welcome, {userName}!</h1>
      <button
        onClick={() => setShowNameInput(true)}
        className="px-4 py-2 border border-secondary/30 text-secondary rounded-lg hover:bg-secondary/10 transition-all"
      >
        Change Name
      </button>
    </div>
  );

  return (
    <header className="header-container">
      <div className="container mx-auto">
        <div className="header-content">
          <div className="flex items-center gap-6">
            <img
              src={tlmLogo}
              alt="The Last Mile Logo"
              className="h-12 object-contain"
            />
            <div className="h-8 w-px bg-white/10"></div>
            <h1 className="text-2xl font-semibold text-gradient-primary">Todo List</h1>
          </div>
          {showNameInput ? renderNameInput() : renderWelcomeMessage()}
        </div>
      </div>
    </header>
  );
}

export default Header;