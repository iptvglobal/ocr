import React, { useState, useCallback, useEffect } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { LanguageSelector } from './components/LanguageSelector';
import { ResultDisplay } from './components/ResultDisplay';
import { ShareComponent } from './components/ShareComponent';
import { extractTextFromImage, translateText } from './services/geminiService';
import { fileToGenerativePart } from './utils/imageUtils';
import { LANGUAGES } from './constants';


interface HomePageProps {}

const ServiceCard: React.FC<{ icon: React.ReactNode, title: string, description: React.ReactNode, features: string[], cta: string, onCtaClick: () => void }> = ({ icon, title, description, features, cta, onCtaClick }) => (
    <div className="bg-gray-800/30 backdrop-blur-lg p-6 rounded-2xl border border-white/10 transition-all duration-300 hover:border-indigo-500/50 hover:-translate-y-2 transform flex flex-col h-full">
        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <div className="mt-2 text-gray-400 flex-grow">{description}</div>
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
    <div className="relative flex-1 flex flex-col items-center text-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white mb-4 border-4 border-gray-900">
            {icon}
        </div>
        <h3 className="text-xl font-bold"><span className="text-purple-400">{step}:</span> {title}</h3>
        <p className="mt-2 text-gray-400">{description}</p>
    </div>
);

const FeatureCard: React.FC<{ icon: string; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-gray-800/30 backdrop-blur-lg border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:border-indigo-500/50 hover:-translate-y-2 transform cursor-pointer">
        <div className="text-3xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{children}</p>
    </div>
);

const TestimonialCard: React.FC<{ quote: string, name: string, role: string }> = ({ quote, name, role }) => (
    <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-2xl border border-white/10 h-full flex flex-col">
        <p className="text-gray-300 flex-grow">“{quote}”</p>
        <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="font-bold text-white">{name}</p>
            <p className="text-sm text-indigo-300">{role}</p>
        </div>
    </div>
);

const FounderSection: React.FC = () => (
  <section className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto text-center">
      <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mb-6 flex items-center justify-center ring-4 ring-gray-700">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
         </svg>
      </div>
      <h2 className="text-3xl font-extrabold text-white sm:text-4xl">A Message From the Founder</h2>
      <div className="mt-8 prose prose-invert prose-lg mx-auto text-gray-300 space-y-6">
        <p>
          Hello, I’m Aymen Lasfar, the creator of this mosagraphic Image-to-Text platform. Let me tell you, I wanted to make the experience as simple as possible for everyone to extract and translate any text from any image. Fast, accurate, and free.
        </p>
        <p>
          We take pride in the work we have completed, being trusted by thousands as users daily on the image to text and image to text translator tools. A testament to the work you have accomplished and a motivator to continue to build on the project.
        </p>
        <p>
          We have new features in the works and will work endlessly to build and expand your translation options. Your needs are our needs. They will continuously update to new standards in performance, speed, and accuracy.
        </p>
      </div>
      <div className="mt-8">
        <p className="text-lg font-semibold text-white">
          — Aymen Lasfar
        </p>
        <p className="text-indigo-300">
          Founder & Owner, mosagraphic
        </p>
      </div>
    </div>
  </section>
);


const HomePage: React.FC<HomePageProps> = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [extractedText, setExtractedText] = useState<string>('');
    const [translatedText, setTranslatedText] = useState<string>('');
    const [targetLanguage, setTargetLanguage] = useState<string>('English');
    const [isExtracting, setIsExtracting] = useState<boolean>(false);
    const [isTranslating, setIsTranslating] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleImageSelect = (file: File) => {
        setImageFile(file);
        setImageUrl(URL.createObjectURL(file));
        setExtractedText('');
        setTranslatedText('');
        setError(null);
    };

    const handleExtract = useCallback(async () => {
        if (!imageFile) {
        setError('Please upload an image first.');
        return;
        }

        setIsExtracting(true);
        setError(null);
        setExtractedText('');
        setTranslatedText('');

        try {
        const imagePart = await fileToGenerativePart(imageFile);
        const textFromImage = await extractTextFromImage(imagePart);
        setExtractedText(textFromImage);
        } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
        } finally {
        setIsExtracting(false);
        }
    }, [imageFile]);
    
    const handleTranslate = useCallback(async () => {
        if (!extractedText) {
            setError('There is no text to translate.');
            return;
        }
        
        setIsTranslating(true);
        setError(null);
        setTranslatedText('');

        try {
            const translation = await translateText(extractedText, targetLanguage);
            setTranslatedText(translation);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred during translation.');
        } finally {
            setIsTranslating(false);
        }

    }, [extractedText, targetLanguage]);
    
    const handleCtaClick = () => {
        document.getElementById('tool')?.scrollIntoView({ behavior: 'smooth' });
    };

  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      {/* Hero Section */}
      <section className="relative pt-20 pb-10 overflow-hidden">
        <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-gray-900 to-purple-900/30 bg-[size:200%_200%] animate-aurora"></div>
             <div 
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl opacity-50 animate-blob-pulse"
              ></div>
            <div 
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-50 animate-blob-pulse animation-delay-4000"
            ></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-purple-300"
          >
            Image to Text Tool: Extract, Edit, and Translate Instantly
          </h1>
          <p 
            className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-300"
          >
            Transform any visual content into editable text in seconds.
          </p>
           <p className="mt-4 text-sm text-indigo-300 tracking-wider">
            AI-Powered OCR Technology &nbsp; | &nbsp; 99.9% Accuracy &nbsp; | &nbsp; 100+ Languages Supported
          </p>
          <div className="mt-10">
            <button
              onClick={handleCtaClick}
              className="px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20 transform hover:scale-105"
            >
              Start Extracting for Free
            </button>
          </div>
        </div>
      </section>

      {/* Intro Section */}
       <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xl text-gray-300 leading-relaxed">
                Sure, effortless converters exist, but feel free to use our OCR. For speedy, precise all-in-one OCR and translation services, we cater to creators, professionals, students, and developers needing a global reach. Every image, every screenshot, every document—turn it to text, extract, edit, translate, and share— all in a click. See the magic for yourself.
            </p>
       </section>
      
      {/* Tool Section */}
      <section id="tool" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Instant, Accurate, and Amazingly Simple</h2>
             <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
                Picture this: you upload an image to your browser and get back flawless text in seconds. With your browser as an interface, you can use our powerful AI-driven image-to-text engine. Click to upload or just drag and drop your file (PNG, JPG, or WEBP, up to 4 MB). Then, hit Extract Text and behold the results in seconds.
            </p>
        </div>
        <div className="w-full flex flex-col items-center space-y-6">
            <div className="w-full p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
                <div className="flex flex-col items-center space-y-4">
                    <ImageUploader onImageSelect={handleImageSelect} imageUrl={imageUrl} />
                    <button
                        onClick={handleExtract}
                        disabled={!imageFile || isExtracting || isTranslating}
                        className="w-full max-w-xs flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {isExtracting ? 'Extracting...' : 'Extract Text'}
                    </button>
                </div>
            </div>

            {error && (
            <div className="w-full text-center p-4 bg-red-900/50 text-red-300 border border-red-700 rounded-md">
                <p><strong>Error:</strong> {error}</p>
            </div>
            )}

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResultDisplay title="Extracted Text" text={extractedText} isLoading={isExtracting} showShareButton={true} />
            <div className="flex flex-col space-y-4">
                {extractedText && (
                    <div className="w-full p-4 bg-gray-800 rounded-xl shadow-lg border border-gray-700 flex flex-col md:flex-row items-center gap-4">
                        <div className="w-full md:w-2/3">
                            <LanguageSelector
                            selectedLanguage={targetLanguage}
                            onLanguageChange={(e) => setTargetLanguage(e.target.value)}
                            languages={LANGUAGES}
                            disabled={isTranslating || isExtracting}
                            />
                        </div>
                        <button
                            onClick={handleTranslate}
                            disabled={isTranslating || isExtracting}
                            className="w-full md:w-1/3 flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 disabled:bg-purple-400 disabled:cursor-not-allowed transition-colors"
                        >
                            {isTranslating ? 'Translating...' : 'Translate'}
                        </button>
                    </div>
                )}
                <ResultDisplay title="Translated Text" text={translatedText} isLoading={isTranslating} />
            </div>
            </div>

            {extractedText && !isExtracting && (
                 <ShareComponent shareUrl="https://mosagraphic.com" shareText="Check out this awesome AI Image to Text tool from mosagraphic!" />
            )}
        </div>
         <div className="mt-12 text-center text-gray-400">
          <p>You can upload an image, and we’ll extract the text in the language of your choice instantly. The text you requested has been generated and is ready for you to copy, edit, or export. You will understand why over 500,000 users incorporate image to text in their workflows after seeing your first conversion.</p>
        </div>
      </section>
      
      {/* How It Works Section */}
        <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Three Steps to Get Your Text</h2>
            </div>
            <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-4">
                <HowItWorksStep step="1" title="Upload" description="Uploading a text image for processing is easy—just drag and drop a screenshot, photo, or any scanned document into your browser. We support JPG, PNG, and WEBP formats." icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>} />
                <div className="flex items-center justify-center">
                    <div className="h-20 w-1 md:h-1 md:w-20 bg-gradient-to-b md:bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50 rounded-full"></div>
                </div>
                <HowItWorksStep step="2" title="AI Processing" description="The system automatically integrates text recognition, language detection, and layout adjustment. Each image’s text and layout processing is completed in milliseconds, leveraging cutting-edge neural network techniques for rapid processing." icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 19c-3.866 0-7-3.134-7-7s3.134-7 7-7 7 3.134 7 7-3.134 7-7 7z" /></svg>} />
                <div className="flex items-center justify-center">
                    <div className="h-20 w-1 md:h-1 md:w-20 bg-gradient-to-b md:bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50 rounded-full"></div>
                </div>
                <HowItWorksStep step="3" title="Extract & Use" description="Edited extracted text is available for instant copying, and document conversion options streamlines exporting. Text can also be continuously translated which is useful for writing research papers, creating business documents, language learning and more." icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>} />
            </div>
        </section>

      {/* Features Grid Section */}
      <section id="features" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Rational in Design</h2>
            <p className="mt-4 text-lg text-gray-400">From a design perspective, it is important to keep a screen uncluttered to preserve customer focus and drive productivity.</p>
        </div>
        <div className="relative mt-16">
            <div className="absolute top-1/2 left-1/2 w-[40rem] h-[40rem] lg:w-[60rem] lg:h-[60rem] bg-gradient-to-br from-indigo-600/20 to-purple-600/20 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-50 animate-pulse-slow pointer-events-none"></div>
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
                <FeatureCard icon="⚡️" title="Process Documents in Pareto-optimal Time">
                   Results are returned in seconds after images are uploaded in bulk. We average 0.8 seconds to process a page. Our OCR (Optical Character Recognition) engine is 10 times more efficient in converting images to text than industry standard, meaning we do it much faster.
                </FeatureCard>
                <FeatureCard icon="🎯" title="Top-Notch OCR Accuracy">
                    Enjoy 99.9% accuracy every single time with 100% Picture to Text and Image to Text conversion, even with cursive, handwritten documents and others in different languages. Our AI systems increase accuracy with each training cycle on millions of documents which translates to 99.9% precision on OCR text and image integration.
                </FeatureCard>
                <FeatureCard icon="🌍" title="Text Transformation in 100+ Languages">
                    With our image to text translator, text conversion and translation is instant. Translations are done in real time and span a multitude of languages including English, Arabic, Chinese, and Cyrillic.
                </FeatureCard>
                <FeatureCard icon="📐" title="Text After Conversion with Original Layout">
                    Rest assured your tables, columns, and other complex document layouts will remain intact. Forget about the headache of reformatting altered documents. We preserve the original layout.
                </FeatureCard>
            </div>
        </div>
      </section>
      
      {/* Services Showcase Section */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">One Tool, Limitless Applications</h2>
            <p className="mt-4 text-lg text-gray-400">This platform caters to every use case from screen document, picture text, and image data.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                title="Screen to Text Capture"
                description="Capture text from screen- shots, online presentations, or virtual meetings. This feature is great for researchers, journalists, and students who need quick access to text content displayed on a screen."
                features={["Real-time capture", "Smart region selection", "Auto-sync to clipboard"]}
                cta="Try Screen Capture"
                onCtaClick={handleCtaClick}
            />
            <ServiceCard 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l-1-1a2 2 0 010-2.828l1-1a2 2 0 012.828 0l2 2A2 2 0 0119 12v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>}
                title="Advanced Image to Text"
                description={<>Photos, contracts, invoices, receipts and scanned documents can all be converted to editable formats seamlessly and accurately. <br/><br/><i>Comprehension of nearly human level will be your work.</i></>}
                features={["AI-powered recognition", "100+ languages supported", "Layout preservation"]}
                cta="Upload Your Image"
                onCtaClick={handleCtaClick}
            />
            <ServiceCard 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                title="Picture to Text Solutions"
                description="Our picture to text system extracts everything clean and precisely, even a handwritten note, a street sign or a business card. It's mobile-optimized for when inspiration (or documentation) strikes."
                features={["Scan business cards", "Multifunctional export", "Batch image processing"]}
                cta="Start Converting"
                onCtaClick={handleCtaClick}
            />
        </div>
      </section>

      {/* Picture to Text Tech Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Reducing Time with Picture to Text Technology</h2>
        </div>
        <div className="mt-8 prose prose-invert prose-lg mx-auto text-gray-300">
          <p>For most people, taking a visual document such as a scanned PDF, notes, screenshots, or contracts involves a lot of time to get the relevant information. With picture to text technology, this time-consuming process is simplified.</p>
          <ul>
            <li>Reduce transcription time by 20x.</li>
            <li>Avoid adjusting over costs.</li>
            <li>Translate your text along with your image.</li>
          </ul>
          <p>Our picture to text technology is a tool ready as a virtual assistant to assist you in a multitude of tasks such as transcribing lecture notes, digitizing documents, or translating travel menus.</p>
        </div>
      </section>

      {/* Why Our Platform Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Why Our Image to Text Platform?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gray-800/30 p-6 rounded-xl border border-white/10">
            <h3 className="font-bold text-white mb-2">1. Integrate Functions From Other Platforms</h3>
            <p className="text-gray-400">You do not have to install Image to Text or register on any device or browser. Image to Text is easily accessible to mobile users for photo to text scans and to desktop users performing batch operations. Just upload and process.</p>
          </div>
          <div className="bg-gray-800/30 p-6 rounded-xl border border-white/10">
            <h3 className="font-bold text-white mb-2">2. Protecting Your Privacy and Data</h3>
            <p className="text-gray-400">Image to Text follows all legal privacy protection regulations. We are fully compliant with GDPR and with AdSense privacy regulations. Uploaded and extracted documents are not stored, ensuring complete confidentiality.</p>
          </div>
          <div className="bg-gray-800/30 p-6 rounded-xl border border-white/10">
            <h3 className="font-bold text-white mb-2">3. Translation That is Accurate</h3>
            <p className="text-gray-400">Compared to other automatic translators available, our image to text translator is much more context aware. It picks up on idioms and professional terminologies and does not lose meaning.</p>
          </div>
          <div className="bg-gray-800/30 p-6 rounded-xl border border-white/10">
            <h3 className="font-bold text-white mb-2">4. Using Deep Learning Technology</h3>
            <p className="text-gray-400">Image to Text uses sophisticated Deep Learning Technology to accurately read and interpret text images. Image to Text Deep Learning Technology produces highly accurate results, even with low resolution scans.</p>
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
             <p className="text-lg text-indigo-300">More than half a million users automated text extraction from images and gained more than 20 hours a week.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
                quote="In one afternoon, I converted hundreds of scanned invoices. Tasks that used to take days, now only take minutes."
                name="Daniel K."
                role="Accountant"
            />
            <TestimonialCard 
                quote="The built in image to text translator helped a lot with my research! I even extracted data from Japanese journals and translated it on the spot."
                name="Jack"
                role="Researcher"
            />
            <TestimonialCard 
                quote="It has enhanced my design team's collaboration during remote work as we use scanned images to extract text from notes."
                name="Amina L."
                role="Creative Director"
            />
        </div>
      </section>

      {/* Founder Section */}
      <FounderSection />
      
       {/* Final CTA Section */}
       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative bg-gray-900/50 rounded-2xl p-8 md:p-12 text-center overflow-hidden border border-white/10">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-1/2 left-1/2 w-[50rem] h-[50rem] bg-gradient-to-br from-indigo-600/30 to-purple-600/30 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-70 animate-pulse-slow"></div>
                </div>
                 <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Ready to Change the Way You Work with Visual Data?</h2>
                 <p className="mt-4 text-lg text-indigo-200">Your images have valuable and hidden information. Let’s extract it! Stop painstakingly retyping screenshots or working with lousy PDFs. Let AI automate the job.</p>
                 <div className="mt-8">
                    <button
                        onClick={handleCtaClick}
                        className="px-8 py-4 border border-transparent text-lg font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 transition-colors shadow-lg shadow-white/10 transform hover:scale-105"
                    >
                        Try mosagraphic Now for Free
                    </button>
                 </div>
            </div>
       </section>
      
        {/* Technical Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Technical Innovation Leading the Way</h2>
             <p className="mt-4 text-lg text-gray-400">Speed, accuracy, and contextual translation are key features of our OCR engine. With the proprietary Neural Vision Pipeline, which analyzes over 40 million images, we obtain edge and contextual pattern recognition. This guarantees unmatched precision.</p>
             <div className="mt-8 text-left prose prose-invert prose-md mx-auto text-gray-300">
                <ul>
                    <li><strong>Adaptive Multilingual Recognition:</strong> The translator promptly integrates spelling and regional differences because of our transformer-based models.</li>
                    <li><strong>Auto Language Detection:</strong> The AI is capable of detecting and segregating multiple languages uploaded in an image and identifies the parts for translation.</li>
                    <li><strong>Intelligent Post Processing:</strong> Every output is adjusted to look as though it was crafted by a person. This is achieved through automated punctuation adjustment and de-hyphenation.</li>
                </ul>
             </div>
        </section>

        {/* Sustainability Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bg-gray-800/30 p-8 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Sustainability and Accessibility Commitment</h2>
            <p className="mt-4 text-gray-400">Our codebase includes accessibility features such as screen-reader support, keyboard navigation, and color contrast. We also evaluate our impact on the environment: your images converted into texts are processed on servers located in data centers that use carbon offsetting, demonstrating minimal ecological impact.</p>
          </div>
        </section>

    </div>
  );
};

export default HomePage;
