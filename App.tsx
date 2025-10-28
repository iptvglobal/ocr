// src/App.tsx (Key Sections)

// --- Corrected Import (Around Line 7) ---
// Note: You must also ensure the OcrResult interface is imported if you use it for typing.
import { extractAndTranslate } from './services/geminiService';
import { fileToGenerativePart } from './utils/imageUtils';
import { LANGUAGES } from './constants';
// import { OcrResult } from './models/OcrResult'; // Add this line if you use OcrResult for typing

// --- Refactored Logic (Inside the main processing function) ---
// This replaces the old two-step extractTextFromImage and translateText calls.

const handleProcessImage = useCallback(async () => {
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

        // --- START OF REFACTORED LOGIC ---
        // FIX 3: Call the single combined function and use its structured result
        const result = await extractAndTranslate(imagePart, targetLanguage);

        // FIX 4: Update state using the properties from the result object
        setExtractedText(result.extracted_text.raw_text);
        setTranslatedText(result.translated_text.content);
        // --- END OF REFACTORED LOGIC ---

    } catch (error) {
        console.error(error);
        setError(error instanceof Error ? error.message : 'An unknown error occurred. Please try again.');
    } finally {
        setIsLoading(false);
    }
}, [imageFile, targetLanguage]);
