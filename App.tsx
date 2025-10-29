import React, { useState, useCallback, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import FAQPage from './FAQPage';
import PrivacyPage from './PrivacyPage';
import TOSPage from './TOSPage';

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const navigate = useCallback((path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage navigate={navigate} />;
      case '/about':
        return <AboutPage />;
      case '/faq':
        return <FAQPage />;
      case '/Privacy-Policy':
        return <PrivacyPage />;
      case '/Terms-of-Service':
        return <TOSPage />;
      default:
        return <HomePage navigate={navigate} />; // Fallback to home for 404
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Navbar navigate={navigate} currentPath={currentPath} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer navigate={navigate} currentPath={currentPath} />
    </div>
  );
};

export default App;