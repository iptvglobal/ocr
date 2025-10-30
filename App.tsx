import React, { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import FAQPage from './FAQPage';
import PrivacyPage from './PrivacyPage';
import TOSPage from './TOSPage';
import ContactPage from './ContactPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigate = useCallback((page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigate={navigate} />;
      case 'about':
        return <AboutPage />;
      case 'faq':
        return <FAQPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'tos':
        return <TOSPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans flex flex-col overflow-x-hidden">
      <Navbar navigate={navigate} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}

export default App;