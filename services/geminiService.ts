// src/services/geminiService.ts

import { GoogleGenAI, Part } from "@google/genai";
import { OcrResult } from "../models/OcrResult"; // Import the defined interface

// Lazily Initialize to avoid crashing the app on module load if API_KEY is missing.
let ai: GoogleGenAI | null = null;
const model = 'gemini-2.5-flash';

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
        ai = new GoogleGenAI({ apiKey: apiKey });
    }

    return ai;
};

/**
 * Extracts text from an image and translates it to English using the Gemini API.
 * @param imagePart The image file as a Part object.
 * @param targetLanguage The language to translate the text to (e.g., 'English').
 * @returns The parsed OCR result.
 */
export const extractAndTranslate = async (imagePart: Part, targetLanguage: string = 'English'): Promise<OcrResult> => {
    const aiClient = getAiClient();

    const prompt = `You are an advanced OCR and translation assistant. Your task is to:
1. **Extract Text**: Carefully analyze the provided image and extract ALL visible text with high accuracy.
2. **Preserve Structure**: Maintain the original layout, formatting, and hierarchy of the text.
3. **Translate to ${targetLanguage}**: Provide a complete ${targetLanguage} translation of all extracted text, maintaining the original structure.

**Output Format (JSON):**
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

    if (!responseText) {
        throw new Error("Gemini API returned an empty response.");
    }

    try {
        const result = JSON.parse(responseText) as OcrResult;
        return result;
    } catch (e) {
        console.error("Failed to parse JSON response from Gemini API:", e);
        throw new Error(`Invalid JSON format from API. Raw response: ${responseText}`);
    }
};
