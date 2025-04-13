import React from 'react';
import tlmLogo from '../assets/tlm-logo.png';

function Footer() {
  return (
    <footer className="relative mt-auto py-8">
      <div className="absolute inset-0 bg-gradient-to-t from-black-rich via-primary-dark to-transparent opacity-20"></div>
      <div className="relative border-t border-gold/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center gap-6 md:gap-8">
            <div className="flex items-center gap-4">
              <img
                src={tlmLogo}
                alt="The Last Mile Logo"
                className="h-10 object-contain"
              />
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
              <div className="flex items-center gap-4">
                <span className="metallic-text font-semibold text-lg">StrayDogSyndications</span>
                <span className="text-gold/60">•</span>
                <span className="text-gold">Todo List</span>
              </div>
              
              <div className="flex items-center space-x-6">
                <a
                  href="https://www.thelastmile.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:text-gold-light transition-colors"
                >
                  About The Last Mile
                </a>
                <a
                  href="https://github.com/StrayDogSyn/full-stack-ToDoList-Hunter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:text-gold-light transition-colors"
                >
                  StrayDogSyn GitHub
                </a>
              </div>

              <div className="text-gold/80 text-sm">
                © {new Date().getFullYear()} StrayDogSyndications L.L.C. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;