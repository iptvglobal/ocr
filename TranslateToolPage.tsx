import React, { useState, useCallback } from 'react';
import { ToolHeader } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { LanguageSelector } from './components/LanguageSelector';
import { ResultDisplay } from './components/ResultDisplay';
import { extractTextFromImage, translateText } from './services/geminiService';
import { fileToGenerativePart } from './utils/imageUtils';
import { LANGUAGES } from './constants';

const TranslateToolPage: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [translatedText, setTranslatedText] = useState<string>('');
  const [targetLanguage, setTargetLanguage] = useState<string>('Spanish');
  
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

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <ToolHeader />
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center space-y-6">
        <p className="text-center text-lg text-gray-400 max-w-2xl">
          Upload an image to instantly extract its text. After extraction, you can translate it into a language of your choice.
        </p>
        
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
          <ResultDisplay title="Extracted Text" text={extractedText} isLoading={isExtracting} />
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
      </div>
    </div>
  );
};

export default TranslateToolPage;
