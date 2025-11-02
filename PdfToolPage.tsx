import React, { useState, useCallback } from 'react';
import { PdfUploader } from './components/PdfUploader';
import { LanguageSelector } from './components/LanguageSelector';
import { ResultDisplay } from './components/ResultDisplay';
import { ShareComponent } from './components/ShareComponent';
import { extractTextFromPdf, translateText } from './services/geminiService';
import { fileToGenerativePart } from './utils/imageUtils';
import { LANGUAGES } from './constants';

const PdfToolPage: React.FC = () => {
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [extractedText, setExtractedText] = useState<string>('');
    const [translatedText, setTranslatedText] = useState<string>('');
    const [targetLanguage, setTargetLanguage] = useState<string>('English');
    const [isExtracting, setIsExtracting] = useState<boolean>(false);
    const [isTranslating, setIsTranslating] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

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

    return (
        <div className="py-16 sm:py-24">
            <section id="tool" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">PDF to Text & Translate</h1>
                    <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
                        Upload a PDF document, extract all text content accurately, and translate it into any supported language in seconds. Powered by Google Gemini.
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
            </section>
        </div>
    );
};

export default PdfToolPage;
