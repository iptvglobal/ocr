// Fixes for src/services/geminiService.ts

// The original code was:
/*
const getAiClient = (): GoogleGenAI => {
    if (!process.env.API_KEY) {
        throw new Error("Configuration Error: The API_KEY environment variable is not set. Please add the API_KEY to your environment variables in your hosting platform's configuration.");
    }
    if (!ai) {
        this.ai = new GoogleGenAI({ apiKey: process.env['GEMINI_API_KEY']! });
    }
    return ai;
};
*/

// --- FIX 1: Environment Variable Check ---
// The application must check for the variable name that is actually being used in the Railway environment.
// Since the user is using `GEMINI_API_KEY` and the code is using `process.env['GEMINI_API_KEY']` for initialization,
// the check must be updated to match.

// --- FIX 2: Initialization Scope ---
// The original code uses `this.ai` inside a standalone function `getAiClient`, which is incorrect in this context
// (likely a class method was intended but was implemented as a function).
// The simplest fix is to wrap the logic in a class or ensure the `ai` variable is correctly initialized.
// Since `ai` is defined globally as `let ai: GoogleGenAI | null = null;`, we should assign to `ai`, not `this.ai`.

// --- FIX 3: Bracket Notation for API Key ---
// The user's second error was likely caused by a mix-up in the code. We will use the bracket notation for safety.

// Corrected Code for geminiService.ts
// (Assuming the file is intended to be a service class or an object with methods)

import { GoogleGenAI, Part } from "@google/genai";

// Lazily Initialize to avoid crashing the app on module load if API_KEY is missing.
let ai: GoogleGenAI | null = null;

/**
 * Initializes and returns the GoogleGenAI client instance.
 * Throws an error if the API key environment variable is not set.
 * @returns An instance of GoogleGenAI.
 */
export const getAiClient = (): GoogleGenAI => {
    // FIX 1: Check for the correct environment variable name (GEMINI_API_KEY)
    const apiKey = process.env['GEMINI_API_KEY']; 

    if (!apiKey) {
        throw new Error("Configuration Error: The GEMINI_API_KEY environment variable is not set. Please add the GEMINI_API_KEY to your environment variables in your hosting platform's configuration.");
    }

    if (!ai) {
        // FIX 2: Assign directly to the global 'ai' variable, not 'this.ai'
        // FIX 3: Use bracket notation for safety
        ai = new GoogleGenAI({ apiKey: apiKey });
    }

    return ai;
};

const model = 'gemini-2.5-flash';

/**
 * Extracts text from an image and translates it to English using the Gemini API.
 * @param imagePart The image file as a Part object.
 * @param targetLanguage The language to translate the text to (e.g., 'English').
 * @returns The parsed OCR result.
 */
export const extractAndTranslate = async (imagePart: Part, targetLanguage: string = 'English'): Promise<OcrResult> => {
    const aiClient = getAiClient(); // Initialize client

    const prompt = `You are an advanced OCR and translation assistant. Your task is to:
1. Extract Text: Carefully analyze the provided image and extract ALL visible text with high accuracy.
2. Preserve Structure: Maintain the original layout, formatting, and hierarchy of the text.
3. Translate to ${targetLanguage}: Provide a complete ${targetLanguage} translation of all extracted text, maintaining the original structure.

Output Format (JSON):
{
  "status": "success",
  "extracted_text": {
    "original_language": "detected language",
    "raw_text": "extracted text as-is from image",
    "structured_text": "text with preserved formatting"
  },
  "translated_text": {
    "language": "${targetLanguage}",
    "content": "full ${targetLanguage} translation"
  },
  "metadata": {
    "confidence": "high/medium/low",
    "unclear_sections": ["list of unclear areas if any"],
    "detected_languages": ["list of languages found"]
  }
}`;

    const response = await aiClient.models.generateContent({
        model: model,
        contents: [imagePart, { text: prompt }],
    });

    const responseText = response.text.trim();

    // Safety check before parsing JSON
    if (!responseText) {
        throw new Error("Gemini API returned an empty response.");
    }

    try {
        const result = JSON.parse(responseText) as OcrResult;
        return result;
    } catch (e) {
        console.error("Failed to parse JSON response from Gemini API:", e);
        // It's possible the model didn't return perfect JSON. Return the raw text for debugging.
        throw new Error(`Invalid JSON format from API. Raw response: ${responseText}`);
    }
};

// You will also need to define the OcrResult interface in a separate file (e.g., models/OcrResult.ts)
export interface OcrResult {
    status: string;
    extracted_text: {
        original_language: string;
        raw_text: string;
        structured_text: string;
    };
    translated_text: {
        language: string;
        content: string;
    };
    metadata: {
        confidence: string;
        unclear_sections: string[];
        detected_languages: string[];
    };
}
