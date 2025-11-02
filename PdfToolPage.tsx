import React, { useState, useCallback } from 'react';
import { PdfUploader } from './components/PdfUploader';
import { LanguageSelector } from './components/LanguageSelector';
import { ResultDisplay } from './components/ResultDisplay';
import { ShareComponent } from './components/ShareComponent';
import { extractTextFromPdf, translateText } from './services/geminiService';
import { fileToGenerativePart } from './utils/imageUtils';
import { LANGUAGES } from './constants';
import { AccordionItem } from './components/AccordionItem';


// --- Reusable components from HomePage ---

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

const FounderSection: React.FC<{title: string, content: React.ReactNode[], author: string, role: string}> = ({title, content, author, role}) => (
  <section className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto text-center">
      <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mb-6 flex items-center justify-center ring-4 ring-gray-700">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
         </svg>
      </div>
      <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{title}</h2>
      <div className="mt-8 prose prose-invert prose-lg mx-auto text-gray-300 space-y-6">
        {content.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      <div className="mt-8">
        <p className="text-lg font-semibold text-white">
          — {author}
        </p>
        <p className="text-indigo-300">
          {role}
        </p>
      </div>
    </div>
  </section>
);


const PdfToolPage: React.FC = () => {
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [extractedText, setExtractedText] = useState<string>('');
    const [translatedText, setTranslatedText] = useState<string>('');
    const [targetLanguage, setTargetLanguage] = useState<string>('English');
    const [isExtracting, setIsExtracting] = useState<boolean>(false);
    const [isTranslating, setIsTranslating] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleCtaClick = () => {
        document.getElementById('tool')?.scrollIntoView({ behavior: 'smooth' });
    };

    const handlePdfSelect = (file: File) => {
        if (file.size > 10 * 1024 * 1024) { // 10MB limit
            setError("File is too large. Please select a PDF under 10MB.");
            setPdfFile(null);
            return;
        }
        setPdfFile(file);
        setExtractedText('');
        setTranslatedText('');
        setError(null);
    };

    const handleExtract = useCallback(async () => {
        if (!pdfFile) {
            setError('Please upload a PDF file first.');
            return;
        }

        setIsExtracting(true);
        setError(null);
        setExtractedText('');
        setTranslatedText('');

        try {
            const pdfPart = await fileToGenerativePart(pdfFile);
            const textFromPdf = await extractTextFromPdf(pdfPart);
            setExtractedText(textFromPdf);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
        } finally {
            setIsExtracting(false);
        }
    }, [pdfFile]);

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

    const faqData = [
        {
          question: "What is the best way to convert a PDF to text online?",
          answer: "All you have to do is upload your PDF and let our AI OCR process it. Within seconds, you can download the clean text as a TXT or DOCX file. No software installation or signup is necessary."
        },
        {
          question: "Does it work with scanned PDFs and images?",
          answer: "Absolutely. Our OCR can scan and identify text in PDFs, and it can handle photos and low-resolution documents, even if they have mixed languages and handwritten notes."
        },
        {
          question: "Is the PDF to text converter really free?",
          answer: "You can copy and download text for free. For larger jobs, you can also use our API, or the bulk uploader that is coming soon."
        },
        {
          question: "Will the tool keep my PDF’s original layout?",
          answer: "Yes. We keep all the details like paragraphs, columns, tables, and indentation so the result is neat and professional, and easy to edit."
        },
        {
          question: "Can I translate the text I extracted?",
          answer: "Yes, you can translate it to more than 100 languages. Our built-in, contextually aware AI translation tool makes it easy. This is great for global teams and research."
        },
        {
          question: "How quickly can I expect conversions?",
          answer: "On average, our system extracts data in about 1.2 seconds per page—that’s up to 10x faster than many OCR tools."
        },
        {
            question: "Is my data safe?",
            answer: "Yes, we don’t sell or share your documents. Your files will remain safe with us. We comply with the GDPR. Documents will also processed in memory and I will be deleted after the extraction is done."
        },
        {
            question: "What’s the max file size?",
            answer: "You can upload 10MB files. For larger files or many documents at once, try the API or wait for the upcoming batch uploader."
        },
        {
            question: "Can I use it from mobile?",
            answer: "Yes, the tool can be used from any device’s browser. You don’t need to install or configure anything to run the tool."
        }
      ];

    return (
        <div className="space-y-24 md:space-y-32 pb-24">
            {/* Hero Section */}
            <section className="relative pt-20 pb-10 overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-gray-900 to-purple-900/30 bg-[size:200%_200%] animate-aurora"></div>
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl opacity-50 animate-blob-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-50 animate-blob-pulse animation-delay-4000"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-purple-300">
                        Experience AI-Powered OCR That Unsparingly Changes Your Workflow
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-300">
                        Transform any visual content into editable text in seconds.
                    </p>
                    <p className="mt-4 text-sm text-indigo-300 tracking-wider">
                        AI-Powered OCR Technology &nbsp; | &nbsp; 99.9% Accuracy &nbsp; | &nbsp; 100+ Languages Supported
                    </p>
                    <div className="mt-10">
                        <button onClick={handleCtaClick} className="px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20 transform hover:scale-105">
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
                        Picture this: you upload a PDF to your browser and get back flawless text in seconds. With your browser as an interface, you can use our powerful AI-driven PDF-to-text engine. Click to upload or just drag and drop your file (PDF, up to 10 MB). Then, hit Extract Text and behold the results in seconds.
                    </p>
                </div>
                <div className="w-full flex flex-col items-center space-y-6">
                    <div className="w-full p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
                        <div className="flex flex-col items-center space-y-4">
                            <PdfUploader onPdfSelect={handlePdfSelect} fileName={pdfFile?.name} />
                            <button
                                onClick={handleExtract}
                                disabled={!pdfFile || isExtracting || isTranslating}
                                className="w-full max-w-xs flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
                            >
                                {isExtracting ? 'Extracting...' : 'Extract Text from PDF'}
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
                         <ShareComponent shareUrl="https://mosagraphic.com/pdf-to-text" shareText="Check out this awesome AI PDF to Text tool from mosagraphic!" />
                    )}
                </div>
                 <div className="mt-12 text-center text-gray-400">
                    <p>You can upload a PDF, and we’ll extract the text in the language of your choice instantly. The text you requested has been generated and is ready for you to copy, edit, or export. You will understand why over 100 users incorporate PDF to text in their workflows after seeing your first conversion.</p>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">How It Works (3 Simple Steps)</h2>
                </div>
                <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-4">
                    <HowItWorksStep step="1" title="Upload your PDF" description="Drag and drop your file into the browser window or tap to upload. We accept both native and scanned PDFs, including multi-page, mixed language documents. Each file can be up to 10MB." icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>} />
                    <div className="flex items-center justify-center"><div className="h-20 w-1 md:h-1 md:w-20 bg-gradient-to-b md:bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50 rounded-full"></div></div>
                    <HowItWorksStep step="2" title="AI processing" description="Our neural OCR engine examines the PDF to find paragraphs, headings, tables, and multi-column layouts. It decodes text with astonishing accuracy even on poor quality scans and pages with annotated handwriting." icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 19c-3.866 0-7-3.134-7-7s3.134-7 7-7 7 3.134 7 7-3.134 7-7 7z" /></svg>} />
                    <div className="flex items-center justify-center"><div className="h-20 w-1 md:h-1 md:w-20 bg-gradient-to-b md:bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50 rounded-full"></div></div>
                    <HowItWorksStep step="3" title="Copy, Edit & Translate" description="Your text is ready for copying, editing, and downloading as a TXT or DOCX file. Instantly translate it to over 100 languages for international business, research, and cross-border collaborations." icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>} />
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
                        Results are returned in seconds. We average 0.8 seconds to process a page. Our OCR (Optical Character Recognition) engine is 10 times more efficient in converting PDFs to text than industry standard.
                        </FeatureCard>
                        <FeatureCard icon="🎯" title="Top-Notch OCR Accuracy">
                            Enjoy 99.9% accuracy every single time, even with cursive, handwritten documents and others in different languages. Our AI systems increase accuracy with each training cycle on millions of documents.
                        </FeatureCard>
                        <FeatureCard icon="🌍" title="Text Transformation in 100+ Languages">
                            With our PDF to text translator, text conversion and translation is instant. Translations are done in real time and span a multitude of languages including English, Arabic, Chinese, and Cyrillic.
                        </FeatureCard>
                        <FeatureCard icon="📐" title="Text After Conversion with Original Layout">
                            Rest assured your tables, columns, and other complex document layouts will remain intact. Forget about the headache of reformatting altered documents. We preserve the original layout.
                        </FeatureCard>
                    </div>
                </div>
            </section>

            {/* Popular Use Cases */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Popular Use Cases</h2>
                </div>
                <div className="mt-8 prose prose-invert prose-lg mx-auto text-gray-300">
                  <ul>
                    <li><strong>Academic and research:</strong> Extract quotes, references, footnotes, and formulas from scanned books or journal PDFs. Build searchable notes without retyping text by hand.</li>
                    <li><strong>Business and finance:</strong> Turn invoices, receipts, contracts, statements, and reports into searchable, editable records to speed up audit trails and reduce data entry time.</li>
                    <li><strong>Content creators and marketers:</strong> Repurpose PDFs and print materials into blogs, social posts, or script drafts. Keep the structure and edit your content without starting from scratch.</li>
                    <li><strong>Legal and Compliance:</strong> Transform case files, filed disclosures, and scanned exhibits into clean text for review, redaction, and eDiscovery processes.</li>
                    <li><strong>Developers and Teams:</strong> Integrate our OCR API into your systems to automate large-scale text recognition for back-office workflows, knowledge bases, and data extraction.</li>
                  </ul>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">What Users Are Saying</h2>
                    <p className="mt-4 text-lg text-indigo-300">Over 100 Users Trust Us. Our PDF text extractor is utilized daily by professionals, students, researchers, and teams around the world.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <TestimonialCard 
                        quote="I converted a 200‑page research PDF into editable text in minutes. Incredible accuracy!"
                        name="Nadia H."
                        role="Student"
                    />
                    <TestimonialCard 
                        quote="This PDF to text tool saved our office countless hours processing invoices."
                        name="Mark P."
                        role="Finance Manager"
                    />
                    <TestimonialCard 
                        quote="I translated scanned PDFs from Arabic to English instantly. It’s a must‑have."
                        name="Laila R."
                        role="Translator"
                    />
                </div>
            </section>

            {/* Founder Section */}
            <FounderSection 
                title="A Note from the Founder"
                content={[
                    "I’m Aymen Lasfar, creator of Mosagraphic’s PDF to Text platform. I built this tool because locked, uneditable PDFs waste time and block access to information.",
                    "Our mission is to give you instant access to your data—faster, more accurate, and 100% free. We’re continuously improving with batch processing, expanded multilingual support, and layout‑preserving exports. Your success inspires every update."
                ]}
                author="Aymen Lasfar"
                role="Founder & Owner, Mosagraphic"
            />

            {/* FAQ Section */}
            <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-4">
                {faqData.map((faq, index) => (
                    <AccordionItem key={index} question={faq.question} answer={faq.answer} />
                ))}
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative bg-gray-900/50 rounded-2xl p-8 md:p-12 text-center overflow-hidden border border-white/10">
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute top-1/2 left-1/2 w-[50rem] h-[50rem] bg-gradient-to-br from-indigo-600/30 to-purple-600/30 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-70 animate-pulse-slow"></div>
                    </div>
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Get Started Free</h2>
                    <p className="mt-4 text-lg text-indigo-200">Stop retyping text and dealing with files that can’t be searched. Convert PDF to text online in just a few seconds and let our AI do the difficult parts. Upload a document and extract text, translate, and more—all in your browser.</p>
                    <div className="mt-8">
                        <button onClick={handleCtaClick} className="px-8 py-4 border border-transparent text-lg font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 transition-colors shadow-lg shadow-white/10 transform hover:scale-105">
                            Try Mosagraphic’s PDF to Text Tool Now
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PdfToolPage;
