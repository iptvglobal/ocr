import React from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import FAQPage from './FAQPage';
import PrivacyPage from './PrivacyPage';
import TOSPage from './TOSPage';
import ContactPage from './ContactPage';

function App() {
  const renderPage = () => {
    const path = window.location.pathname;
    switch (path) {
      case '/about':
        return <AboutPage />;
      case '/faq':
        return <FAQPage />;
      case '/privacy-policy':
        return <PrivacyPage />;
      case '/terms-of-service':
        return <TOSPage />;
      case '/contact':
        return <ContactPage />;
      case '/':
      default:
        // Render HomePage for the root path or any unknown paths
        return <HomePage />;
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans flex flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
