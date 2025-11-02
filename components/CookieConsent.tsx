import React, { useState, useEffect } from 'react';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consentStatus = localStorage.getItem('cookie_consent_status');
    if (!consentStatus) {
      setIsVisible(true);
    }
  }, []);

  const handleConsent = (consent: 'accepted' | 'declined') => {
    localStorage.setItem('cookie_consent_status', consent);
    setIsVisible(false);
    // In a real production environment with a Google Certified CMP, this is where you would
    // trigger an update to Google's consent state.
    // e.g., window.gtag('consent', 'update', { 'ad_storage': consent === 'accepted' ? 'granted' : 'denied' });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div 
        className="fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700 p-4 z-50 animate-fade-in-up"
        role="dialog"
        aria-live="polite"
        aria-label="Cookie Consent Banner"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-300">
          We use cookies to enhance your experience, personalize content and ads, and analyze our traffic. By clicking 'Accept All,' you consent to our use of cookies. Read our{' '}
          <a href="/privacy-policy" className="font-semibold text-indigo-400 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
        <div className="flex-shrink-0 flex items-center gap-x-4">
          <button
            onClick={() => handleConsent('declined')}
            className="px-4 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={() => handleConsent('accepted')}
            className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
       <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};