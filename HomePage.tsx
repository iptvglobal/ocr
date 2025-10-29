import React from 'react';
import { Page } from './App';

interface HomePageProps {
  setPage: (page: Page) => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 transition-all duration-300 hover:border-indigo-500 hover:bg-gray-800 transform hover:-translate-y-1">
        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="mt-2 text-gray-400">{description}</p>
    </div>
);

const HomePage: React.FC<HomePageProps> = ({ setPage }) => {
  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      {/* Hero Section */}
      <section className="pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
            Unlock the World's Text. Instantly.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-300">
            Extract text from any image and translate it into dozens of languages with the power of AI. From screenshots to street signs, get the information you need in seconds.
          </p>
          <div className="mt-10">
            <button
              onClick={() => setPage('tool')}
              className="px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20 transform hover:scale-105"
            >
              Try Vision Translate AI Now
            </button>
          </div>
        </div>
      </section>

      {/* Service Showcase Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Simple. Powerful. Instant.</h2>
            <p className="mt-4 text-lg text-gray-400">Your three-step process to effortless understanding.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>}
                title="1. Upload Any Image"
                description="Simply drag and drop or select any image file from your device. We support PNG, JPG, WEBP, and more."
            />
            <FeatureCard 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l-2.293-2.293a1 1 0 010-1.414l7.586-7.586a1 1 0 011.414 0l7.586 7.586a1 1 0 010 1.414L15 21m-5-5a2 2 0 002 2h.01a2 2 0 002-2v-.01a2 2 0 00-2-2h-.01a2 2 0 00-2 2v.01z" /></svg>}
                title="2. AI-Powered Text Extraction"
                description="Our advanced OCR, powered by Google Gemini, accurately recognizes and extracts every word in moments."
            />
            <FeatureCard 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m4 13h4m-4 0V5a2 2 0 012-2h4a2 2 0 012 2v12a2 2 0 01-2 2h-4a2 2 0 01-2-2z" /></svg>}
                title="3. Translate to Any Language"
                description="Get instant, context-aware translations in your choice of language, breaking down barriers instantly."
            />
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-300 leading-relaxed">
        <div className="prose prose-invert prose-lg mx-auto">
            <h2 className="text-3xl font-extrabold text-white">Why Choose Vision Translate AI?</h2>
            <p>In a world overflowing with visual information, the ability to quickly extract text from images and understand it is no longer a luxury—it's a necessity. Vision Translate AI is a cutting-edge online OCR (Optical Character Recognition) tool designed to be your indispensable partner in this visual age. Whether you're a student trying to digitize notes from a textbook, a professional capturing data from a presentation, or a traveler needing to understand a sign in a foreign language, our tool provides a seamless and powerful solution.</p>
            
            <h3 className="text-2xl font-bold text-white">The Power of Google Gemini for Unmatched Accuracy</h3>
            <p>At the heart of Vision Translate AI is Google's state-of-the-art Gemini API. This isn't just any OCR technology; it's one of the most advanced AI models in the world. This allows us to offer superior accuracy when you need to extract text from images. Our photo translator can handle various fonts, styles, and image qualities, minimizing errors and ensuring you get a reliable text output every time. This powerful backend means you can trust our image to text converter for both casual and professional tasks.</p>

            <h3 className="text-2xl font-bold text-white">Seamless Multilingual OCR Translation</h3>
            <p>Our service goes beyond simple text extraction. Vision Translate AI is a comprehensive multilingual OCR translation platform. After extracting the text, our tool can instantly translate it into dozens of languages. This feature is perfect for tourists, international business professionals, and language learners. Imagine taking a photo of a menu in Japan and instantly having it translated into English on your screen. With our tool, this becomes a simple, everyday capability. We are constantly expanding our list of supported languages to make the world a more accessible place.</p>

            <h3 className="text-2xl font-bold text-white">Privacy-First Design</h3>
            <p>We understand that the images you upload may contain sensitive information. That's why we built Vision Translate AI with a strong commitment to your privacy. Your images are processed in memory and are never stored on our servers. The entire process—from upload to translation—is secure and stateless. You can use our service with the confidence that your data remains your own. For more details, please review our comprehensive Privacy Policy.</p>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
