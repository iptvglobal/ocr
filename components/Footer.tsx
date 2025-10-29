import React from 'react';

interface FooterProps {
  navigate: (path: string) => void;
}

const SparklesIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6 text-indigo-400"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-6.857 2.143L12 21l-2.143-6.857L3 12l6.857-2.143L12 3z" />
    </svg>
);

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const FooterLink: React.FC<{ path: string; children: React.ReactNode }> = ({ path, children }) => (
    <li>
      <a href={path} onClick={(e) => { e.preventDefault(); navigate(path); }} className="text-gray-400 hover:text-white transition-colors">
        {children}
      </a>
    </li>
  );

  return (
    <footer className="bg-gray-800 border-t border-gray-700">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
             <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="flex items-center space-x-2">
               <SparklesIcon />
               <span className="text-xl font-bold text-white">Screen 2 Text</span>
            </a>
            <p className="text-gray-400 text-base">
              Extracting text from images, screenshots, and documents with the power of Google's Gemini AI.
            </p>
            <p className="text-xs text-gray-500">
                Powered by Google Cloud and Gemini API.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-8 md:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Sitemap</h3>
                <ul className="mt-4 space-y-4">
                  <FooterLink path="/">Home</FooterLink>
                  <FooterLink path="/about">About</FooterLink>
                  <FooterLink path="/faq">FAQ</FooterLink>
                  <FooterLink path="/tool">Try Now</FooterLink>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-4">
                  <FooterLink path="/privacy">Privacy Policy</FooterLink>
                  <FooterLink path="/tos">Terms of Service</FooterLink>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-base text-gray-400">&copy; {new Date().getFullYear()} Screen 2 Text. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
