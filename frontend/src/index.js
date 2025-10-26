// Added comments to improve readability and maintainability
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css'; // Importing global styles
import App from './App'; // Main application component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);