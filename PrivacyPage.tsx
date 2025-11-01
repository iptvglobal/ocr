import React, { useEffect } from "react";

const PrivacyPage: React.FC = () => {
  useEffect(() => {
    const originalTitle = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const originalDescContent = metaDesc ? metaDesc.getAttribute('content') : null;
    const metaRobots = document.querySelector('meta[name="robots"]');
    const originalRobotsContent = metaRobots ? metaRobots.getAttribute('content') : null;

    document.title = "Privacy Policy - mosagraphic";
    if (metaDesc) metaDesc.setAttribute('content', "Read the Privacy Policy for mosagraphic.com to understand how we handle your data, our use of cookies, and our commitment to protecting your personal information.");
    if (metaRobots) metaRobots.setAttribute('content', 'noindex, nofollow');

    return () => {
        document.title = originalTitle;
        if (metaDesc && originalDescContent) metaDesc.setAttribute('content', originalDescContent);
        if (metaRobots && originalRobotsContent) metaRobots.setAttribute('content', originalRobotsContent);
    };
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-gray-900 text-gray-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-400">
            Effective Date: November 1, 2025
          </p>
        </header>

        <article className="prose prose-invert prose-lg mx-auto text-gray-300 space-y-8">
          <p>
            This Privacy Policy describes how mosagraphic.com ("the Site," "we," "us," or "our") collects, uses, and discloses your personal information when you visit or make a purchase from the Site.
          </p>

          <div id="info-we-collect">
            <h2>Information We Collect</h2>
            <p>We collect information about you in a few different ways:</p>
            <h3>1.1. Information You Directly Provide</h3>
            <p>
              We collect information you voluntarily provide to us, such as your name, email address, and any other information you choose to provide when you contact us, subscribe to a newsletter, or submit a form on the Site. This also includes any images or files you upload to our service for text extraction and translation, and the resulting extracted and translated text ("User Content").
            </p>
            <p>
              <strong>Note on User Content:</strong> When you upload an image to our service, that image is sent directly to Google's Gemini API for processing. We do not log, store, or otherwise retain your images on our servers after the processing is complete. The process is stateless. The text content generated from your image is also handled in a stateless manner. It is returned to you in your browser session and is not stored in our systems.
            </p>
            <p className="p-4 border-l-4 border-red-500 bg-red-900/20">
              <strong>Misuse Disclaimer:</strong> Users are strictly prohibited from uploading or processing any illegal or sensitive documents such as identification cards, passports, credit cards, or other official records. Our service is intended for general text extraction and translation only.
            </p>
            
            <h3>1.2. Automatically Collected Information (Log Data and Cookies)</h3>
            <p>
              When you access the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as "Device Information."
            </p>
            <p>We collect Device Information using the following technologies:</p>
            <ul>
                <li>"Cookies" are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit http://www.allaboutcookies.org.</li>
                <li>"Log files" track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.</li>
                <li>"Web beacons," "tags," and "pixels" are electronic files used to record information about how you browse the Site.</li>
            </ul>
          </div>

          <div id="how-we-use">
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Communicate with you.</li>
              <li>Screen our orders for potential risk or fraud.</li>
              <li>Provide you with information or advertising relating to our products or services (in accordance with the preferences you have shared with us).</li>
              <li>Improve and optimize our Site (e.g., by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).</li>
            </ul>
          </div>

          <div id="sharing-info">
            <h2>Sharing Your Personal Information</h2>
            <p>
              We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Google Analytics to help us understand how our customers use the Site—you can read more about how Google uses your Personal Information here: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a>. You can also opt-out of Google Analytics here: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">https://tools.google.com/dlpage/gaoptout</a>.
            </p>
            <p>
              We may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
            </p>
          </div>

          <div id="adsense">
            <h2>Google AdSense and Third-Party Advertising Disclosure</h2>
            <p>mosagraphic.com uses Google AdSense, a service for including advertisements from Google Inc. ("Google").</p>
            <ul>
                <li><strong>Third-Party Vendors and Cookies:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites.</li>
                <li><strong>DoubleClick DART Cookie:</strong> Google's use of the DART cookie enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
                <li><strong>Personalized Advertising:</strong> The ads served by Google AdSense may be personalized. You can opt out of personalized advertising by visiting Google's <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Ads Settings</a>.</li>
                <li><strong>Third-Party Vendors and Ad Networks:</strong> We notify you of the third-party vendors and ad networks serving ads on our site. You may visit the websites of those vendors and ad networks to opt out of the use of cookies for personalized advertising (if the vendor or ad network offers this capability).</li>
            </ul>
          </div>

          <div id="your-rights">
            <h2>Your Rights (GDPR and CCPA)</h2>
            <p>
              If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.
            </p>
             <p>
              If you are a California resident, you have the right to request information about the categories of personal information we collected about you and the categories of sources from which we collected the personal information.
            </p>
          </div>
          
          <div id="data-retention">
              <h2>Data Retention and Security</h2>
              <p>When you contact us through the Site, we will maintain your contact information for our records unless and until you ask us to delete this information. For User Content (uploaded images and extracted text), we retain this data only for the duration necessary to provide the service, typically deleting it automatically shortly after the extraction and translation process is complete and the user has closed the session or downloaded the results. We do not use your User Content for any purpose other than to provide the OCR and translation service to you.</p>
              <p>We use SSL encryption and other reasonable technical safeguards to protect your data from unauthorized access, alteration, or disclosure. We take reasonable measures to protect the information transmitted through our service, including the use of HTTPS (SSL/TLS) encryption for all data in transit between your browser, our servers, and the Google API.</p>
          </div>
          
           <div id="gemini-api">
              <h2>Use of Google Gemini API and GDPR Compliance</h2>
              <p>Our service relies on the Google Gemini API to provide its core functionality (image to text extraction and translation). Your use of our service is also subject to Google's own privacy policies and terms. Google may use data sent to its API for service improvement, as outlined in their API Terms of Service and Privacy Policy. We have configured our integration to prioritize user privacy, but we recommend you review Google's policies as well.</p>
              <p>For users in the European Economic Area (EEA), we process data in compliance with the General Data Protection Regulation (GDPR). Since we do not store personal data from the images you provide, our primary role is that of a data processor acting on your instructions. The legal basis for processing this data is the fulfillment of the service you have requested from us.</p>
          </div>

          <div id="changes">
            <h2>Changes</h2>
            <p>
              We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.
            </p>
          </div>
          
          <div id="contact">
            <h2>Contact Information</h2>
            <p>
              For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us using the details provided below or visit our <a href="/contact">contact us page</a>:
            </p>
             <address className="not-italic mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                Mosagraphic LLC<br/>
                Rua das Forças Armadas, Nº 133, 3ª Esquerdo, 4715-029, Braga<br/>
                Email: <a href="mailto:business@mosagraphic.com">business@mosagraphic.com</a><br/>
                Phone: <a href="tel:+351920715535">+351 920 715 535</a>
            </address>
          </div>

        </article>
      </div>
    </section>
  );
};

export default PrivacyPage;
