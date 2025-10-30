import React, { useEffect } from 'react';

const PrivacyPage: React.FC = () => {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <div className="py-16 sm:py-24 bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-lg text-gray-300">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
        <div className="prose prose-invert prose-lg mx-auto text-gray-300 leading-relaxed">
          <p>Your privacy is important to us. It is mosagraphic's policy to respect your privacy regarding any information we may process while operating our website.</p>

          <h3>Data We Process</h3>
          <p>
            <strong>Image Data:</strong> When you upload an image to our service, that image is sent directly to Google's Gemini API for processing. We do not log, store, or otherwise retain your images on our servers after the processing is complete. The process is stateless.
          </p>
          <p>
            <strong>Extracted and Translated Text:</strong> The text content generated from your image is also handled in a stateless manner. It is returned to you in your browser session and is not stored in our systems.
          </p>
          <p>
            <strong>Usage Data:</strong> We may collect non-personally-identifying information of the sort that web browsers and servers typically make available, such as the browser type, language preference, referring site, and the date and time of each visitor request. Our purpose in collecting this information is to better understand how our visitors use the website and to ensure service stability. This data is anonymized and not linked to any personal information.
          </p>

          <h3>Use of Google Gemini API</h3>
          <p>
            Our service relies on the Google Gemini API to provide its core functionality. Your use of our service is also subject to Google's own privacy policies and terms. Google may use data sent to its API for service improvement, as outlined in their <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">API Terms of Service</a> and Privacy Policy. We have configured our integration to prioritize user privacy, but we recommend you review Google's policies as well.
          </p>

          <h3>GDPR Compliance</h3>
          <p>
            For users in the European Economic Area (EEA), we process data in compliance with the General Data Protection Regulation (GDPR). Since we do not store personal data from the images you provide, our primary role is that of a data processor acting on your instructions. The legal basis for processing this data is the fulfillment of the service you have requested from us.
          </p>

          <h3>Security</h3>
          <p>
            We take reasonable measures to protect the information transmitted through our service, including the use of HTTPS (SSL/TLS) encryption for all data in transit between your browser, our servers, and the Google API.
          </p>

          <h3>Changes to This Policy</h3>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;