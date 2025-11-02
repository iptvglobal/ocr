import React, { useEffect } from "react";

const DMCAPage: React.FC = () => {
  useEffect(() => {
    const originalTitle = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const originalDescContent = metaDesc ? metaDesc.getAttribute('content') : null;
    const metaRobots = document.querySelector('meta[name="robots"]');
    const originalRobotsContent = metaRobots ? metaRobots.getAttribute('content') : null;

    document.title = "DMCA Policy - mosagraphic";
    if (metaDesc) metaDesc.setAttribute('content', "Read the DMCA Policy for mosagraphic.com to understand the procedures for submitting copyright infringement claims and counter-notifications.");
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
            DMCA Policy
          </h1>
          <p className="text-lg text-gray-400">
            Effective Date: November 1, 2025
          </p>
        </header>

        <article className="prose prose-invert prose-lg mx-auto text-gray-300 space-y-10">
          <p>
            At Mosagraphic, we respect the intellectual property rights of others and expect our users to do the same. This Digital Millennium Copyright Act ("DMCA") Policy outlines the procedures for submitting copyright infringement claims and counter-notifications to us.
          </p>

          <div>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400 mb-4">1. Designated Agent</h2>
            <p>Pursuant to the DMCA, Mosagraphic has designated a Copyright Agent to receive notifications of claimed copyright infringement.</p>
            <address className="not-italic mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <strong>Designated Copyright Agent:</strong><br/>
                Mosagraphic<br/>
                Rua das Forças Armadas, Nº 133, 3º Esquerdo, 4715-029 Braga, Portugal<br/>
                Email: <a href="mailto:business@mosagraphic.com">business@mosagraphic.com</a><br/>
                Phone: <a href="tel:+351920715535">+351 920 715 535</a>
            </address>
          </div>
          
          <div>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400 mb-4">2. How to Submit a Copyright Complaint (Takedown Notice)</h2>
            <p>If you are a copyright owner (or authorized to act on behalf of one) and believe that any material available on or through our website infringes upon your copyright, you may submit a written DMCA takedown notice to our Designated Agent that includes the following elements:</p>
            <h3 className="text-xl font-bold text-white mt-6">2.1. Required Elements of the Notice</h3>
            <ol className="list-decimal pl-5 space-y-2">
                <li>Identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works are covered by a single notification, a representative list of such works.</li>
                <li>Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit us to locate the material (e.g., the exact URL(s) or location on our website).</li>
                <li>Information reasonably sufficient to permit us to contact the complaining party, such as an address, telephone number, and, if available, an electronic mail address at which the complaining party may be contacted.</li>
                <li>A statement that the complaining party has a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
                <li>A statement that the information in the notification is accurate, and under penalty of perjury, that the complaining party is authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
                <li>The physical or electronic signature of the person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
            </ol>
          </div>
          
          <div>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400 mb-4">3. Counter Notification Procedure</h2>
            <p>If you believe that your content was removed or disabled by mistake or misidentification, you may submit a counter-notification to our Designated Agent.</p>
            <h3 className="text-xl font-bold text-white mt-6">3.1. Required Elements of the Counter-Notice</h3>
            <ol className="list-decimal pl-5 space-y-2">
                <li>Your physical or electronic signature.</li>
                <li>Identification of the material that has been removed or to which access has been disabled and the location at which the material appeared before it was removed or access to it was disabled.</li>
                <li>A statement under penalty of perjury that you have a good faith belief that the material was removed or disabled as a result of mistake or misidentification of the material to be removed or disabled.</li>
                <li>Your name, address, and telephone number.</li>
                <li>A statement that you consent to the jurisdiction of the Portuguese courts for the judicial district in which your address is located, or if your address is outside of Portugal, for any judicial district in which Mosagraphic may be found, and that you will accept service of process from the person who provided the original notification of infringement.</li>
            </ol>
          </div>

          <div>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400 mb-4">4. Repeat Infringers</h2>
            <p>We reserve the right to terminate accounts or block access for users who are found to be repeat infringers of intellectual property rights.</p>
          </div>

          <div>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400 mb-4">5. Questions</h2>
            <p>If you have any questions about this DMCA Policy, please contact us at <a href="mailto:business@mosagraphic.com" className="text-indigo-400 hover:underline">business@mosagraphic.com</a>.</p>
          </div>

        </article>
      </div>
    </section>
  );
};

export default DMCAPage;
