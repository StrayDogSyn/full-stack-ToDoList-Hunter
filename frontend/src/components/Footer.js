import React from 'react';

function Footer() {
  return (
    <footer className="relative mt-auto">
      <div className="absolute inset-0 bg-gradient-to-t from-black-rich to-transparent opacity-50"></div>
      <div className="relative border-t-2 border-gold/30 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright Section */}
            <div className="text-gold/70 text-sm">
              <span className="metallic-text">© {new Date().getFullYear()} StrayDog Todo List.</span>
              <span className="ml-2">All rights reserved.</span>
            </div>

            {/* Links Section */}
            <div className="flex space-x-6">
              <a
                href="https://github.com/StrayDogSyn/full-stack-ToDoList-Hunter"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link text-sm"
              >
                GitHub
              </a>
              <a
                href="https://github.com/StrayDogSyn/full-stack-ToDoList-Hunter/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link text-sm"
              >
                License
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;