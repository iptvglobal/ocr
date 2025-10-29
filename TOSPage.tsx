import React from 'react';

const TOSPage: React.FC = () => {
  return (
    <div className="py-16 sm:py-24 bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">Terms of Service</h1>
          <p className="mt-4 text-lg text-gray-300">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
        <div className="prose prose-invert prose-lg mx-auto text-gray-300 leading-relaxed">
          <p>By accessing and using Screen 2 Text (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the Service.</p>
          
          <h3>1. Use of Service</h3>
          <p>
            You agree to use the Service only for lawful purposes. You are prohibited from uploading any content that:
          </p>
          <ul>
            <li>Is illegal, harmful, or infringes on the rights of others.</li>
            <li>Contains viruses or other malicious code.</li>
            <li>Is intended to disrupt or overwhelm our service infrastructure.</li>
          </ul>
          
          <h3>2. Intellectual Property</h3>
          <p>
            The content you upload remains your property. By using the Service, you grant us a temporary, non-exclusive license to process your content as necessary to provide the text extraction and translation functionality. This license terminates immediately after the processing is complete.
          </p>
          
          <h3>3. Disclaimer of Warranties</h3>
          <p>
            The Service is provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not warrant that the Service will be uninterrupted, error-free, or that the results obtained from the use of the Service will be accurate or reliable. You acknowledge that the quality of the output is highly dependent on the quality of the input image.
          </p>

          <h3>4. Limitation of Liability</h3>
          <p>
            In no event shall Screen 2 Text, nor its directors, employees, or partners, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </p>

          <h3>5. Third-Party Services</h3>
          <p>
            Our Service utilizes the Google Gemini API. Your use of our Service is therefore also subject to Google's Terms of Service. We are not responsible for the practices or policies of third-party services.
          </p>

          <h3>6. Changes to Terms</h3>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms of Service on this page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TOSPage;