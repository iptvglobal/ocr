import React, { useState } from 'react';

interface NavbarProps {
  navigate: (page: string) => void;
  currentPath: string;
}

const SparklesIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6 text-indigo-400"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-6.857 2.143L12 21l-2.143-6.857L3 12l6.857-2.143L12 3z" />
    </svg>
);

export const Navbar: React.FC<NavbarProps> = ({ navigate, currentPath }) => {
  const [isOpen, setIsOpen] = useState(false);

  const NavLink: React.FC<{ path: string; children: React.ReactNode }> = ({ path, children }) => (
    <a
      href={path}
      onClick={(e) => { e.preventDefault(); navigate(path); setIsOpen(false); }}
      className={`text-base font-medium transition-colors ${currentPath === path ? 'text-indigo-400' : 'text-gray-300 hover:text-white'}`}
    >
      {children}
    </a>
  );
  
  const handleTryNowClick = (e: React.MouseEvent) => {
      e.preventDefault();
      setIsOpen(false);
      
      if (currentPath === '/') {
          document.getElementById('tool')?.scrollIntoView({ behavior: 'smooth' });
      } else {
          navigate('/');
          setTimeout(() => {
              document.getElementById('tool')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
      }
  };


  return (
    <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="flex items-center space-x-2">
               <SparklesIcon />
               <span className="text-xl font-bold text-white">Screen 2 Text</span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <NavLink path="/">Home</NavLink>
              <NavLink path="/about">About</NavLink>
              <NavLink path="/faq">FAQ</NavLink>
              <button
                onClick={handleTryNowClick}
                className="ml-4 px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                Try Now
              </button>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink path="/">Home</NavLink>
            <NavLink path="/about">About</NavLink>
            <NavLink path="/faq">FAQ</NavLink>
             <button
                onClick={handleTryNowClick}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Try Now
              </button>
          </div>
        </div>
      )}
    </nav>
  );
};
