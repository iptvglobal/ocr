import React, { useEffect } from "react";

const TOSPage: React.FC = () => {
  useEffect(() => {
    // Meta tags for robots and SEO
    const title = document.createElement("title");
    title.textContent = "Terms and Conditions - Mosagraphic";
    const metaRobots = document.createElement("meta");
    metaRobots.name = "robots";
    metaRobots.content = "noindex, nofollow";
    const metaDesc = document.createElement("meta");
    metaDesc.name = "description";
    metaDesc.content =
      "Read the Terms and Conditions for using Mosagraphic.com — our rules regarding text extraction, privacy, and responsible usage.";

    document.head.appendChild(title);
    document.head.appendChild(metaRobots);
    document.head.appendChild(metaDesc);

    return () => {
      document.head.removeChild(title);
      document.head.removeChild(metaRobots);
      document.head.removeChild(metaDesc);
    };
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-gray-900 text-gray-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-4">
            Terms and Conditions
          </h1>
          <p className="text-lg text-gray-400">
            Effective Date: November 1, 2025
          </p>
        </header>

        {/* Content */}
        <article className="space-y-10 leading-relaxed">
          <p className="text-gray-300 text-lg">
            Welcome to our website. By using this site and its tools, you agree
            to the following terms and conditions. Please read them carefully.
          </p>

          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using our website and services, you agree to
              comply with these Terms and Conditions. If you do not agree,
              please do not use our site.
            </p>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              2. Description of Service
            </h2>
            <p>
              Our tool allows users to upload images that contain text,
              automatically extract that text, and edit or download it. The
              service is designed for educational, creative, and personal
              productivity purposes — not for altering or falsifying official
              documents or personal identification materials.
            </p>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              3. User Responsibilities
            </h2>
            <p>You are responsible for all activities under your use of our tool. You agree not to upload or edit:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Any content that violates the law.</li>
              <li>
                Scanned IDs, passports, payment cards, or other sensitive
                personal information.
              </li>
              <li>Content that infringes on another’s rights or privacy.</li>
            </ul>
            <p className="mt-3">
              We reserve the right to block or report any misuse of the service.
            </p>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              4. Intellectual Property
            </h2>
            <p>
              All software, content, and design elements on this site are owned
              by us or our licensors. You may not reproduce, distribute, or
              modify them without permission.
            </p>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              5. Disclaimer of Warranties
            </h2>
            <p>
              The service is provided “as is” and “as available.” We do not
              guarantee that it will be error-free, uninterrupted, or that all
              text extraction results will be accurate.
            </p>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              6. Limitation of Liability
            </h2>
            <p>
              We are not responsible for any direct or indirect damages, data
              loss, or misuse of the service. Use of this tool is entirely at
              your own risk.
            </p>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              7. Privacy
            </h2>
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
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              8. Modifications to Terms
            </h2>
            <p>
              We may update these Terms at any time. Updates will be posted on
              this page with a new effective date.
            </p>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              9. Governing Law
            </h2>
            <p>
              These Terms are governed by the laws of Portugal and applicable EU
              regulations.
            </p>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              10. Contact
            </h2>
            <p>
              If you have any questions, please contact us at:{" "}
              <a
                href="mailto:business@mosagraphic.com"
                className="text-indigo-400 hover:underline"
              >
                business@mosagraphic.com
              </a>
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default TOSPage;
