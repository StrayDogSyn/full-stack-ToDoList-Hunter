// Added comments to improve readability and maintainability
import React from 'react';

function Footer() {
  return (
    <footer className="bg-black border-t border-gold/30 py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright Section */}
          <div className="text-gold/70 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} StrayDog Todo List. All rights reserved.
          </div>

          {/* Links Section */}
          <div className="flex space-x-6">
            <a
              href="https://github.com/StrayDogSyn/full-stack-ToDoList-Hunter"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/70 hover:text-gold transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://github.com/StrayDogSyn/full-stack-ToDoList-Hunter/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/70 hover:text-gold transition-colors"
            >
              License
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;