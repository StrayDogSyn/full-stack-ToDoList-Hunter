import React from 'react';

function Footer() {
  return (
    <footer className="relative mt-auto py-8">
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary-dark to-transparent opacity-20"></div>
      <div className="relative border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gradient-primary font-semibold">The Last Mile</span>
              <span className="text-neutral-400">•</span>
              <span className="text-neutral-400">Todo List</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <a
                href="https://www.thelastmile.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-secondary-light transition-colors"
              >
                About TLM
              </a>
              <a
                href="https://github.com/StrayDogSyn/full-stack-ToDoList-Hunter"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-secondary-light transition-colors"
              >
                GitHub
              </a>
            </div>

            <div className="text-neutral-400 text-sm">
              © {new Date().getFullYear()} The Last Mile. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;