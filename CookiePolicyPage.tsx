import React, { useEffect } from "react";

const CookiePolicyPage: React.FC = () => {
  useEffect(() => {
    const originalTitle = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const originalDescContent = metaDesc ? metaDesc.getAttribute('content') : null;
    const metaRobots = document.querySelector('meta[name="robots"]');
    const originalRobotsContent = metaRobots ? metaRobots.getAttribute('content') : null;

    document.title = "Cookie Policy - mosagraphic";
    if (metaDesc) metaDesc.setAttribute('content', "Learn about the cookies used on mosagraphic.com, their purpose, and how you can manage your consent preferences for a personalized and secure experience.");
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
            Cookie Policy
          </h1>
          <p className="text-lg text-gray-400">
            Effective Date: November 1, 2025
          </p>
        </header>

        <article className="prose prose-invert prose-lg mx-auto text-gray-300 space-y-8">
          <p>
            This Cookie Policy explains what cookies are, how we use them on mosagraphic.com ("the Site," "we," "us," or "our"), and your choices regarding cookies.
          </p>

          <div>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400 mb-4">What Are Cookies?</h2>
            <p>
              Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the site owners.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400 mb-4">How We Use Cookies</h2>
            <p>We use cookies for several purposes. They can be divided into the following categories:</p>
            
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-white">Necessary & Security Cookies</h3>
              <p>These cookies are essential for the website to function properly and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms. They also help ensure the security of our website and services. You can set your browser to block or alert you about these cookies, but some parts of the site will not then work.</p>
            </div>

            <div className="mt-6">
              <h3 className="text-2xl font-bold text-white">Analytics Cookies</h3>
              <p>These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site. All information these cookies collect is aggregated and therefore anonymous. If you do not allow these cookies, we will not know when you have visited our site and will not be able to monitor its performance.</p>
            </div>

            <div className="mt-6">
              <h3 className="text-2xl font-bold text-white">Advertising Cookies</h3>
              <p>These cookies may be set through our site by our advertising partners, such as Google AdSense. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites. They do not store directly personal information but are based on uniquely identifying your browser and internet device. If you do not allow these cookies, you will experience less targeted advertising.</p>
            </div>
            
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-white">Functionality Cookies</h3>
              <p>These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages. For example, they may remember your preferences for language or region. If you do not allow these cookies, then some or all of these services may not function properly.</p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400 mb-4">Your Choices and How to Manage Consent</h2>
            <p>
              We respect your right to privacy. When you first visit our site, you will see a cookie banner that allows you to accept all cookies, reject non-essential cookies, or customize your preferences.
            </p>
            <p>
              You can change your cookie settings at any time by clicking on the floating cookie icon that appears at the bottom corner of the screen. This will bring up the preferences panel where you can enable or disable the different categories of cookies.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400 mb-4">Changes to This Cookie Policy</h2>
            <p>
              We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Effective Date" at the top.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400 mb-4">Contact Us</h2>
            <p>
              If you have any questions about our use of cookies, please contact us via our <a href="/contact" className="text-indigo-400 hover:underline">Contact Page</a> or by emailing us at <a href="mailto:business@mosagraphic.com" className="text-indigo-400 hover:underline">business@mosagraphic.com</a>.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default CookiePolicyPage;