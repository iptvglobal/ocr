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
    <div className="py-16 sm:py-24 bg-gray-900 text-gray-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-white sm:text-6xl">Privacy Policy</h1>
          <p className="mt-4 text-lg text-gray-400">Effective Date: November 1, 2025</p>
        </div>

        <div className="leading-relaxed space-y-6">
          <p>
            This Privacy Policy describes how{" "}
            <a
              href="https://mosagraphic.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline"
            >
              mosagraphic.com
            </a>{" "}
            ("the Site," "we," "us," or "our") collects, uses, and discloses your personal information when you visit or make a purchase from the Site.
          </p>

          {/* SECTION */}
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-10 mb-4">Information We Collect</h2>
          <p>We collect information about you in a few different ways:</p>

          <h3 className="text-xl font-semibold text-indigo-300 mt-6 mb-2">1.1. Information You Directly Provide</h3>
          <p>
            We collect information you voluntarily provide to us, such as your name, email address, and any other information you choose to provide when you contact us, subscribe to a newsletter, or submit a form on the Site. This also includes any images or files you upload to our service for text extraction and translation, and the resulting extracted and translated text ("User Content").
          </p>
          <p>
            <strong>Note on User Content:</strong> When you upload an image to our service, that image is sent directly to Google's Gemini API for processing. We do not log, store, or otherwise retain your images on our servers after the processing is complete.
          </p>
          <p>
            <strong>Misuse Disclaimer:</strong> Users are strictly prohibited from uploading or processing any illegal or sensitive documents such as identification cards, passports, credit cards, or other official records.
          </p>

          <h3 className="text-xl font-semibold text-indigo-300 mt-6 mb-2">
            1.2. Automatically Collected Information (Log Data and Cookies)
          </h3>
          <p>
            When you access the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and cookies. As you browse the Site, we collect details about the pages or products you view and how you interact with the Site.
          </p>

          <ul className="list-disc ml-6 space-y-2">
            <li>
              “Cookies” are small files stored on your device. Learn more at{" "}
              <a
                href="http://www.allaboutcookies.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:underline"
              >
                allaboutcookies.org
              </a>.
            </li>
            <li>“Log files” record actions such as your IP address, browser type, and time stamps.</li>
            <li>“Web beacons,” “tags,” and “pixels” record browsing behavior.</li>
          </ul>

          {/* SECTION */}
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-10 mb-4">How We Use Your Information</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Communicate with you.</li>
            <li>Screen orders for fraud or misuse.</li>
            <li>Provide information or advertising (based on your consent).</li>
            <li>Improve and optimize our website and services.</li>
          </ul>

          {/* SECTION */}
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-10 mb-4">Sharing Your Personal Information</h2>
          <p>
            We share your information with trusted third parties. For example, we use Google Analytics to help us understand how users interact with our site. Learn more:{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline"
            >
              Google Privacy Policy
            </a>{" "}
            |{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline"
            >
              Opt Out
            </a>
          </p>

          {/* SECTION */}
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-10 mb-4">
            Google AdSense and Third-Party Advertising
          </h2>
          <p>
            <a
              href="https://mosagraphic.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline"
            >
              mosagraphic.com
            </a>{" "}
            uses Google AdSense to display relevant ads. Third-party vendors, including Google, may use cookies to serve personalized ads.
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              Opt out of personalized ads in{" "}
              <a
                href="https://myadcenter.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:underline"
              >
                Google Ads Settings
              </a>.
            </li>
            <li>
              Learn more about ad technology providers in{" "}
              <a
                href="https://support.google.com/adsense/answer/9012903"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:underline"
              >
                AdSense Help Center
              </a>.
            </li>
          </ul>

          {/* SECTION */}
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-10 mb-4">Your Rights (GDPR and CCPA)</h2>
          <p>
            You may request access, correction, or deletion of your data. Contact us to exercise your rights under applicable privacy laws.
          </p>

          {/* SECTION */}
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-10 mb-4">Data Retention and Security</h2>
          <p>
            Uploaded images and extracted text are deleted after processing. We use SSL encryption (HTTPS) to protect your data.
          </p>

          {/* SECTION */}
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-10 mb-4">Children’s Privacy</h2>
          <p>We do not knowingly collect data from children under 13 years old.</p>

          {/* SECTION */}
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-10 mb-4">Third-Party Services</h2>
          <p>We use trusted tools like Google Gemini, Analytics, and AdSense, each with its own privacy policy.</p>

          {/* SECTION */}
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-10 mb-4">Changes</h2>
          <p>We may update this policy occasionally. Check this page for the latest version.</p>

          {/* SECTION */}
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-10 mb-4">Contact Information</h2>
          <p>
            Mosagraphic<br />
            Rua das Forças Armadas, Nº 133, 3º Esquerdo, 4715-029 Braga<br />
            Email:{" "}
            <a href="mailto:business@mosagraphic.com" className="text-indigo-400 hover:underline">
              business@mosagraphic.com
            </a>
            <br />
            Phone:{" "}
            <a href="tel:+351920715535" className="text-indigo-400 hover:underline">
              +351 920 715 535
            </a>
          </p>
          <p>
            Visit our{" "}
            <a
              href="https://mosagraphic.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline"
            >
              Contact Page
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
