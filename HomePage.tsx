import React from 'react';

interface HomePageProps {
  navigate: (path: string) => void;
}

const ServiceCard: React.FC<{ icon: React.ReactNode, title: string, description: string, features: string[], cta: string, onCtaClick: () => void }> = ({ icon, title, description, features, cta, onCtaClick }) => (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 transition-all duration-300 hover:border-indigo-500 hover:bg-gray-800 transform hover:-translate-y-1 flex flex-col">
        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="mt-2 text-gray-400 flex-grow">{description}</p>
        <ul className="mt-4 space-y-2 text-gray-300">
            {features.map((feature, i) => (
                <li key={i} className="flex items-start">
                    <svg className="w-5 h-5 mr-2 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
        <button onClick={onCtaClick} className="mt-6 w-full text-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
            {cta}
        </button>
    </div>
);

const HowItWorksStep: React.FC<{ step: string, title: string, description: string, icon: React.ReactNode }> = ({ step, title, description, icon }) => (
    <div className="relative flex flex-col items-center text-center p-6 bg-gray-800 rounded-lg">
        <div className="absolute -top-6 bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl border-4 border-gray-900">{step}</div>
        <div className="mt-8 text-indigo-400">{icon}</div>
        <h3 className="mt-4 text-xl font-bold">{title}</h3>
        <p className="mt-2 text-gray-400">{description}</p>
    </div>
);

const FeatureBlock: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode, reverse?: boolean }> = ({ icon, title, children, reverse = false }) => (
    <div className={`grid md:grid-cols-2 gap-8 items-center ${reverse ? 'md:grid-flow-col-dense' : ''}`}>
        <div className={`p-8 bg-gray-800/50 rounded-lg border border-gray-700 ${reverse ? 'md:col-start-2' : ''}`}>
            <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl">{icon}</span>
                <h3 className="text-2xl font-bold text-white">{title}</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">{children}</p>
        </div>
        <div className={`flex items-center justify-center ${reverse ? 'md:col-start-1' : ''}`}>
             <div className="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center border border-indigo-500/30">
                <p className="text-indigo-400 text-5xl opacity-50">{icon}</p>
            </div>
        </div>
    </div>
);


const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      {/* Hero Section */}
      <section className="pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
            Transform Any Visual Content Into Editable Text in Seconds
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-300">
            AI-Powered OCR Technology | 99.9% Accuracy | 100+ Languages Supported. Turn screenshots, images, and documents into usable data instantly.
          </p>
          <div className="mt-10">
            <button
              onClick={() => navigate('/tool')}
              className="px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20 transform hover:scale-105"
            >
              Start Extracting for Free
            </button>
          </div>
        </div>
      </section>

      {/* Services Showcase Section */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">One Tool, Limitless Applications</h2>
            <p className="mt-4 text-lg text-gray-400">From screen to text, and image to data, we have you covered.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                title="Screen to Text Capture"
                description="Instantly extract text from screenshots, presentations, and on-screen content with one click. Perfect for virtual meetings and research."
                features={["Real-time capture", "Smart region selection", "Auto-sync to clipboard"]}
                cta="Try Screen Capture →"
                onCtaClick={() => navigate('/tool')}
            />
            <ServiceCard 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l-1-1a2 2 0 010-2.828l1-1a2 2 0 012.828 0l2 2A2 2 0 0119 12v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>}
                title="Advanced Image to Text"
                description="Convert photos, scanned documents, and image files into editable text formats. Industry-leading accuracy powered by AI."
                features={["AI-powered recognition", "100+ language support", "Layout preservation"]}
                cta="Upload Image →"
                onCtaClick={() => navigate('/tool')}
            />
            <ServiceCard 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                title="Picture to Text Solutions"
                description="Extract text from any picture format - from street signs to business cards. Multi-format support with instant results."
                features={["Mobile photo processing", "Business card scanning", "Multi-format export"]}
                cta="Start Converting →"
                onCtaClick={() => navigate('/tool')}
            />
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Get Your Text in 3 Simple Steps</h2>
            <p className="mt-4 text-lg text-gray-400">Effortless extraction from upload to output.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 md:gap-16">
            <HowItWorksStep step="1" title="Upload" description="Drag & drop or browse for any image or screenshot." icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>} />
            <HowItWorksStep step="2" title="AI Processing" description="Our Gemini-powered AI analyzes and extracts text with incredible accuracy." icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 19c-3.866 0-7-3.134-7-7s3.134-7 7-7 7 3.134 7 7-3.134 7-7 7z" /></svg>} />
            <HowItWorksStep step="3" title="Extract & Use" description="Copy, edit, translate, or export your text instantly." icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>} />
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Powerful Features, Simple Interface</h2>
            <p className="mt-4 text-lg text-gray-400">Everything you need for fast and accurate text extraction.</p>
        </div>
        <FeatureBlock icon="⚡️" title="Process Documents in Milliseconds">Our optimized engine processes files 10x faster than competitors. Bulk upload hundreds of images and get results in seconds, not minutes. Average processing time: 0.8 seconds per page.</FeatureBlock>
        <FeatureBlock icon="🎯" title="Industry-Leading OCR Precision" reverse>Advanced AI algorithms ensure your picture-to-text conversions are pixel-perfect. Our screen-to-text technology learns from millions of documents to deliver 99.9% accuracy.</FeatureBlock>
        <FeatureBlock icon="🌍" title="Convert Text in 100+ Languages">From English to Arabic, Chinese to Cyrillic—our image-to-text service recognizes global scripts with equal precision, breaking down language barriers effortlessly.</FeatureBlock>
        <FeatureBlock icon="📐" title="Maintain Original Formatting" reverse>Tables, columns, and complex layouts stay intact during conversion. Get structured, ready-to-use documents without the hassle of reformatting.</FeatureBlock>
      </section>

      {/* Final CTA Section */}
       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-8 md:p-12 text-center">
                 <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Ready to Transform Your Visual Content?</h2>
                 <p className="mt-4 text-lg text-indigo-100">Join 500,000+ users who save 20+ hours per week.</p>
                 <div className="mt-8">
                    <button
                        onClick={() => navigate('/tool')}
                        className="px-8 py-4 border border-transparent text-lg font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 transition-colors shadow-lg transform hover:scale-105"
                    >
                        Try Screen 2 Text Now
                    </button>
                 </div>
            </div>
       </section>
    </div>
  );
};

export default HomePage;
