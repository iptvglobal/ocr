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
          <p className="mt-4 text-lg text-gray-300">Effective Date: November 1, 2025</p>
        </div>

        <div className="prose prose-invert prose-lg mx-auto text-gray-300 leading-relaxed">
          <p>
            This Privacy Policy describes how{" "}
            <a href="https://mosagraphic.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
              mosagraphic.com
            </a>{" "}
            ("the Site," "we," "us," or "our") collects, uses, and discloses your personal information when you visit or make a purchase from the Site.
          </p>

          <h3>Information We Collect</h3>
          <p>We collect information about you in a few different ways:</p>

          <h4>1.1. Information You Directly Provide</h4>
          <p>
            We collect information you voluntarily provide to us, such as your name, email address, and any other information you choose to provide when you contact us, subscribe to a newsletter, or submit a form on the Site. This also includes any images or files you upload to our service for text extraction and translation, and the resulting extracted and translated text ("User Content").
          </p>
          <p>
            <strong>Note on User Content:</strong> When you upload an image to our service, that image is sent directly to Google's Gemini API for processing. We do not log, store, or otherwise retain your images on our servers after the processing is complete. The process is stateless. The text content generated from your image is also handled in a stateless manner. It is returned to you in your browser session and is not stored in our systems.
          </p>
          <p>
            <strong>Misuse Disclaimer:</strong> Users are strictly prohibited from uploading or processing any illegal or sensitive documents such as identification cards, passports, credit cards, or other official records. Our service is intended for general text extraction and translation only.
          </p>

          <h4>1.2. Automatically Collected Information (Log Data and Cookies)</h4>
          <p>
            When you access the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as "Device Information."
          </p>
          <p>We collect Device Information using the following technologies:</p>
          <ul>
            <li>
              "Cookies" are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit{" "}
              <a href="http://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
                http://www.allaboutcookies.org
              </a>.
            </li>
            <li>
              "Log files" track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.
            </li>
            <li>
              "Web beacons," "tags," and "pixels" are electronic files used to record information about how you browse the Site.
            </li>
          </ul>

          <h3>How We Use Your Information</h3>
          <ul>
            <li>Communicate with you.</li>
            <li>Screen our orders for potential risk or fraud.</li>
            <li>Provide you with information or advertising relating to our products or services (in accordance with the preferences you have shared with us).</li>
            <li>Improve and optimize our Site (e.g., by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).</li>
          </ul>

          <h3>Sharing Your Personal Information</h3>
          <p>
            We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Google Analytics to help us understand how our customers use the Site — you can read more about how Google uses your Personal Information here:{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
              https://policies.google.com/privacy
            </a>. You can also opt-out of Google Analytics here:{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
              https://tools.google.com/dlpage/gaoptout
            </a>.
          </p>

          <h3>Google AdSense and Third-Party Advertising Disclosure</h3>
          <p>
            <a href="https://mosagraphic.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
              mosagraphic.com
            </a>{" "}
            uses Google AdSense, a service for including advertisements from Google Inc. ("Google").
          </p>
          <ul>
            <li><strong>Third-Party Vendors and Cookies:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites.</li>
            <li><strong>DoubleClick DART Cookie:</strong> Google's use of the DART cookie enables it and its partners to serve ads to users based on their visit to our site and/or other sites on the Internet.</li>
            <li><strong>Personalized Advertising:</strong> The ads served by Google AdSense may be personalized. You can opt out of personalized advertising by visiting Google's{" "}
              <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
                Ads Settings
              </a>.
            </li>
            <li><strong>Third-Party Vendors and Ad Networks:</strong> You may visit the websites of those vendors and ad networks to opt out of the use of cookies for personalized advertising.</li>
            <li>
              <strong>Vendor List:</strong> See Google’s full ad technology provider list here:{" "}
              <a href="https://support.google.com/adsense/answer/9012903" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
                AdSense Help Center
              </a>.
            </li>
          </ul>

          <h3>Your Rights (GDPR and CCPA)</h3>
          <p>If you are a European or California resident, you have the right to access, correct, update, or delete your personal information. Contact us to exercise these rights.</p>

          <h3>Data Retention and Security</h3>
          <p>
            We only retain user contact information as needed for communication or legal compliance. Uploaded images and extracted text are deleted automatically once processing ends. All transmissions are encrypted using HTTPS (SSL/TLS).
          </p>

          <h3>Children’s Privacy</h3>
          <p>Our services are not intended for children under 13. We do not knowingly collect personal data from children.</p>

          <h3>Third-Party Services</h3>
          <p>We may use tools such as Google Gemini, Analytics, or AdSense, each governed by their own privacy policies.</p>

          <h3>Use of Google Gemini API and GDPR Compliance</h3>
          <p>Our service uses Google Gemini API for OCR and translation. Processing is done under GDPR compliance and user privacy is prioritized. No user data is permanently stored.</p>

          <h3>Changes</h3>
          <p>We may update this Privacy Policy occasionally to reflect changes to our practices or legal requirements.</p>

          <h3>Contact Information</h3>
          <p>
            Mosagraphic LLC<br />
            Rua das Forças Armadas, Nº 133, 3ª Esquerdo, 4715-029, Braga<br />
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
            Or visit our{" "}
            <a href="https://mosagraphic.com/contact" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
              Contact Page
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
