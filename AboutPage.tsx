import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="py-16 sm:py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-400 tracking-wide uppercase">About Us</h2>
          <p className="mt-1 text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Bridging Languages, One Image at a Time
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-300">
            Our mission is to make the world's visual information accessible and understandable to everyone, regardless of language.
          </p>
        </div>
      </div>

      <div className="mt-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-gray-300 leading-relaxed">
        <div className="prose prose-invert prose-lg mx-auto">
          <h3>Our Technology</h3>
          <p>
            mosagraphic stands on the shoulders of giants. We leverage a modern, powerful tech stack to deliver a fast, reliable, and secure experience.
          </p>
          <ul>
            <li><strong>Google Gemini API:</strong> The core of our application. We use the 'gemini-2.5-flash' model for its exceptional speed and accuracy in multimodal understanding, allowing us to perform both OCR and complex translation tasks with state-of-the-art precision.</li>
            <li><strong>React & TypeScript:</strong> Our user interface is built with React, ensuring a dynamic and responsive experience on any device. TypeScript adds a layer of robustness, helping us build a reliable and maintainable application.</li>
            <li><strong>Tailwind CSS:</strong> For a beautiful, modern, and mobile-first design system that allows us to rapidly prototype and build the user interface you see.</li>
          </ul>

          <h3>Our Commitment to Privacy</h3>
          <p>
            We believe that powerful tools should not come at the cost of your privacy. Our application is designed from the ground up to be stateless. We do not store your images or the text extracted from them. Each transaction is securely processed by Google's API and then immediately discarded. Your data is yours alone.
          </p>
          
          <h3>Meet the Team</h3>
          <p>
            We are a passionate team of developers and designers dedicated to building useful and accessible tools with the latest in AI technology. (Team bios would go here).
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;