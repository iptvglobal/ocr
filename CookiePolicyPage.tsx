import React, { useEffect } from "react";

const CookiePolicyPage: React.FC = () => {
  useEffect(() => {
    const originalTitle = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const originalDescContent = metaDesc ? metaDesc.getAttribute('content') : null;
    const metaRobots = document.querySelector('meta[name="robots"]');
    const originalRobotsContent = metaRobots ? metaRobots.getAttribute('content') : null;

    document.title = "Cookie Policy - mosagraphic";
    if (metaDesc) metaDesc.setAttribute('content', "Learn about the cookies used on mosagraphic.com and how you can manage your consent preferences for analytics, advertising, and more.");
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
            This Cookie Policy explains how mosagraphic.com ("we," "us," or "our") uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
          </p>

          <div>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400 mb-4">What Are Cookies?</h2>
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400 mb-4">Why Do We Use Cookies?</h2>
            <p>
              We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "necessary" or "essential" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our site. Third parties serve cookies through our website for advertising, analytics, and other purposes.
            </p>
          </div>

           <div>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400 mb-4">Types of Cookies We Use</h2>
            <ul>
                <li><strong>Necessary Cookies:</strong> These are essential for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms.</li>
                <li><strong>Analytics Cookies:</strong> These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.</li>
                <li><strong>Advertising Cookies:</strong> These cookies may be set through our site by our advertising partners (like Google AdSense). They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.</li>
                <li><strong>Functionality Cookies:</strong> These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400 mb-4">How Can You Control Cookies?</h2>
            <p>
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by using our cookie consent manager. When you first visit our site, a banner will appear asking for your consent.
            </p>
            <p>
              You can also change your preferences at any time by clicking on the cookie icon that appears at the bottom-right of your screen. This will reopen the consent banner and allow you to adjust your settings or withdraw your consent.
            </p>
          </div>
          
          <div>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400 mb-4">Changes to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400 mb-4">Contact Us</h2>
            <p>
              For more information about our use of cookies or other technologies, please email us at <a href="mailto:business@mosagraphic.com">business@mosagraphic.com</a> or by post to:
            </p>
             <address className="not-italic mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                Mosagraphic<br/>
                Rua das Forças Armadas, Nº 133, 3º Esquerdo, 4715-029, Braga<br/>
                Portugal
            </address>
          </div>
        </article>
      </div>
    </section>
  );
};

export default CookiePolicyPage;
