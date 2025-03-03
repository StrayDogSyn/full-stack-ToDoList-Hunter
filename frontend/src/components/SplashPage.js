import React from 'react';
import { useNavigate } from 'react-router-dom';
const SplashPage = () => {
    const navigate = useNavigate(); // initialize the navigate function
  
    const handleClick = () => {
      // Navigate to the main page when the button is clicked
      navigate('/main');
    };
  
  return (
    <div className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 h-screen flex justify-center items-center text-center text-white">
      <div>
        <h1 className="text-5xl font-extrabold mb-6 hover:text-slate-200 transition-all transform hover:scale-110">
          To-Do List App
        </h1>
        <p className="text-xl mb-6 opacity-90 animate__animated animate__fadeIn animate__delay-1s">
          Your tasks, your way. Organize your life with ease!
        </p>
        <p className="text-lg">Redirecting...</p>
      </div>
    </div>
  );
};

export default SplashPage;
