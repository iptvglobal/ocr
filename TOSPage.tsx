import React, { useEffect } from 'react';

const TOSPage: React.FC = () => {
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
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">Terms and Conditions</h1>
          <p className="mt-4 text-lg text-gray-300">Effective Date: November 1, 2025</p>
        </div>
        <div className="prose prose-invert prose-lg mx-auto text-gray-300 leading-relaxed">
          <p>Welcome to our website. By using this site and its tools, you agree to the following terms and conditions. Please read them carefully.</p>

          <h3>1. Acceptance of Terms</h3>
          <p>By accessing or using our website and services, you agree to comply with these Terms and Conditions. If you do not agree, please do not use our site.</p>
          
          <h3>2. Description of Service</h3>
          <p>Our tool allows users to upload images that contain text, automatically extract that text, and edit or download it. The service is designed for educational, creative, and personal productivity purposes — not for altering or falsifying official documents or personal identification materials.</p>
          
          <h3>3. User Responsibilities</h3>
          <p>You are responsible for all activities under your use of our tool. You agree not to upload or edit:</p>
          <ul>
            <li>Any content that violates the law.</li>
            <li>Scanned IDs, passports, payment cards, or other sensitive personal information.</li>
            <li>Content that infringes on another’s rights or privacy.</li>
          </ul>
          <p>We reserve the right to block or report any misuse of the service.</p>

          <h3>4. Intellectual Property</h3>
          <p>All software, content, and design elements on this site are owned by us or our licensors. You may not reproduce, distribute, or modify them without permission.</p>

          <h3>5. Disclaimer of Warranties</h3>
          <p>The service is provided “as is” and “as available.” We do not guarantee that it will be error-free, uninterrupted, or that all text extraction results will be accurate.</p>

          <h3>6. Limitation of Liability</h3>
          <p>We are not responsible for any direct or indirect damages, data loss, or misuse of the service. Use of this tool is entirely at your own risk.</p>

          <h3>7. Privacy</h3>
          <p>We respect your privacy. Uploaded images may be temporarily processed but are not stored permanently. For more information, please refer to our <a href="/privacy-policy" className="text-indigo-400 hover:underline">Privacy Policy</a>.</p>
          
          <h3>8. Modifications to Terms</h3>
          <p>We may update these Terms at any time. Updates will be posted on this page with a new effective date.</p>
          
          <h3>9. Governing Law</h3>
          <p>These Terms are governed by the laws of Portugal and applicable EU regulations.</p>

          <h3>10. Contact</h3>
          <p>If you have any questions, please contact us at:</p>
          <p>Email: <a href="mailto:support@mosagraphic.xyz" className="text-indigo-400 hover:underline">support@mosagraphic.xyz</a></p>
        </div>
      </div>
    </div>
  );
};

export default TOSPage;
