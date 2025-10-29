import React, { useState, useCallback, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import HomePage from './HomePage';
import TranslateToolPage from './TranslateToolPage';
import AboutPage from './AboutPage';
import FAQPage from './FAQPage';
import PrivacyPage from './PrivacyPage';
import TOSPage from './TOSPage';

export type Page = 'home' | 'tool' | 'about' | 'faq' | 'privacy' | 'tos';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleSetPage = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.hash.substring(1) as Page;
      if (['home', 'tool', 'about', 'faq', 'privacy', 'tos'].includes(path)) {
        setCurrentPage(path);
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    handlePopState(); 

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    if (window.location.hash !== `#${currentPage}`) {
      window.location.hash = currentPage;
    }
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setPage={handleSetPage} />;
      case 'tool':
        return <TranslateToolPage />;
      case 'about':
        return <AboutPage />;
      case 'faq':
        return <FAQPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'tos':
        return <TOSPage />;
      default:
        return <HomePage setPage={handleSetPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Navbar setPage={handleSetPage} currentPage={currentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer setPage={handleSetPage} />
    </div>
  );
};

export default App;
