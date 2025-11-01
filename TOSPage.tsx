import React, { useEffect } from "react";

const TOSPage: React.FC = () => {
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-gray-900 text-gray-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Terms and Conditions
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Effective Date: November 1, 2025
          </p>
        </header>

        {/* Content */}
        <article className="prose prose-invert prose-lg mx-auto leading-relaxed">
          <p>
            Welcome to our website. By using this site and its tools, you agree
            to the following terms and conditions. Please read them carefully.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using our website and services, you agree to comply
            with these Terms and Conditions. If you do not agree, please do not
            use our site.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            Our tool allows users to upload images that contain text,
            automatically extract that text, and edit or download it. The
            service is designed for educational, creative, and personal
            productivity purposes — not for altering or falsifying official
            documents or personal identification materials.
          </p>

          <h2>3. User Responsibilities</h2>
          <p>You are responsible for all activities under your use of our tool. You agree not to upload or edit:</p>
          <ul>
            <li>Any content that violates the law.</li>
            <li>
              Scanned IDs, passports, payment cards, or other sensitive personal
              information.
            </li>
            <li>Content that infringes on another’s rights or privacy.</li>
          </ul>
          <p>We reserve the right to block or report any misuse of the service.</p>

          <h2>4. Intellectual Property</h2>
          <p>
            All software, content, and design elements on this site are owned by
            us or our licensors. You may not reproduce, distribute, or modify
            them without permission.
          </p>

          <h2>5. Disclaimer of Warranties</h2>
          <p>
            The service is provided “as is” and “as available.” We do not
            guarantee that it will be error-free, uninterrupted, or that all
            text extraction results will be accurate.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            We are not responsible for any direct or indirect damages, data
            loss, or misuse of the service. Use of this tool is entirely at your
            own risk.
          </p>

          <h2>7. Privacy</h2>
          <p>
            We respect your privacy. Uploaded images may be temporarily
            processed but are not stored permanently. For more information,
            please refer to our{" "}
            <a
              href="/privacy-policy"
              className="text-indigo-400 hover:underline"
            >
              Privacy Policy
            </a>
            .
          </p>

          <h2>8. Modifications to Terms</h2>
          <p>
            We may update these Terms at any time. Updates will be posted on
            this page with a new effective date.
          </p>

          <h2>9. Governing Law</h2>
          <p>
            These Terms are governed by the laws of Portugal and applicable EU
            regulations.
          </p>

          <h2>10. Contact</h2>
          <p>
            If you have any questions, please contact us at:{" "}
            <a
              href="mailto:business@mosagraphic.com"
              className="text-indigo-400 hover:underline"
            >
              business@mosagraphic.com
            </a>
          </p>
        </article>
      </div>
    </section>
  );
};

export default TOSPage;
