
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { LanguageSelector } from './components/LanguageSelector';
import { ResultDisplay } from './components/ResultDisplay';
import { extractAndTranslate } from './services/geminiService';
import { fileToGenerativePart } from './utils/imageUtils';
import { LANGUAGES } from './constants';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [translatedText, setTranslatedText] = useState<string>('');
  const [targetLanguage, setTargetLanguage] = useState<string>('Spanish');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
    setExtractedText('');
    setTranslatedText('');
    setError(null);
  };

  const handleSubmit = useCallback(async () => {
    if (!imageFile) {
      setError('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setExtractedText('');
    setTranslatedText('');

    try {
      const imagePart = await fileToGenerativePart(imageFile);
      
      const textFromImage = await extractTextFromImage(imagePart);
      setExtractedText(textFromImage);

      if (textFromImage.trim()) {
        const translation = await translateText(textFromImage, targetLanguage);
        setTranslatedText(translation);
      } else {
        setTranslatedText('No text found to translate.');
      }

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [imageFile, targetLanguage]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <Header />
      <main className="w-full max-w-4xl mx-auto flex flex-col items-center space-y-6">
        <p className="text-center text-lg text-gray-400 max-w-2xl">
          Upload an image to instantly extract its text and translate it into a language of your choice. Powered by Gemini.
        </p>
        
        <div className="w-full p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageUploader onImageSelect={handleImageSelect} imageUrl={imageUrl} />
            <div className="flex flex-col justify-center space-y-4">
              <LanguageSelector
                selectedLanguage={targetLanguage}
                onLanguageChange={(e) => setTargetLanguage(e.target.value)}
                languages={LANGUAGES}
                disabled={isLoading}
              />
              <button
                onClick={handleSubmit}
                disabled={!imageFile || isLoading}
                className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Processing...' : 'Extract & Translate'}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="w-full text-center p-4 bg-red-900/50 text-red-300 border border-red-700 rounded-md">
            <p><strong>Error:</strong> {error}</p>
          </div>
        )}

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <ResultDisplay title="Extracted Text" text={extractedText} isLoading={isLoading} />
          <ResultDisplay title="Translated Text" text={translatedText} isLoading={isLoading} />
        </div>
      </main>
      <footer className="w-full max-w-4xl mx-auto text-center py-6 mt-6 text-gray-500 text-sm">
        <p>Built with React, Tailwind CSS, and the Google Gemini API.</p>
      </footer>
    </div>
  );
};

export default App;
