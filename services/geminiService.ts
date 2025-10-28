// Final, Consolidated Code for src/services/geminiService.ts

import { GoogleGenAI, Part } from "@google/genai";

// --- CONSOLIDATED OCR RESULT INTERFACE ---
// Since the 'models' folder is missing, the interface is defined here.
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
Please ensure your entire response is a single JSON object that strictly adheres to the following structure. DO NOT include any text, markdown code fences (\`\`\`json), or explanations outside of the JSON object.

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
}
`; // The closing backtick must be the last character of the string.
// I have ensured the closing backtick is correctly placed.
// The previous error was likely caused by an extra line or character after the final backtick, or an issue with the build tool's parsing of the multi-line string.

// To be absolutely safe and avoid multi-line string parsing issues in older environments,
// I will use string concatenation, which is less readable but more universally safe in all build environments:

const prompt = "You are an advanced OCR and translation assistant. Your task is to:\n"
             + "1. **Extract Text**: Carefully analyze the provided image and extract ALL visible text with high accuracy.\n"
             + "2. **Preserve Structure**: Maintain the original layout, formatting, and hierarchy of the text.\n"
             + "3. **Translate to " + targetLanguage + "**: Provide a complete " + targetLanguage + " translation of all extracted text, maintaining the original structure.\n\n"
             + "**Output Format (JSON):**\n"
             + "Please ensure your entire response is a single JSON object that strictly adheres to the following structure. DO NOT include any text, markdown code fences (```json), or explanations outside of the JSON object.\n\n"
             + "{\n"
             + "  \"status\": \"success\",\n"
             + "  \"extracted_text\": {\n"
             + "    \"original_language\": \"detected language\",\n"
             + "    \"raw_text\": \"extracted text as-is from image\",\n"
             + "    \"structured_text\": \"text with preserved formatting\"\n"
             + "  },\n"
             + "  \"translated_text\": {\n"
             + "    \"language\": \"" + targetLanguage + "\",\n"
             + "    \"content\": \"full " + targetLanguage + " translation\"\n"
             + "  },\n"
             + "  \"metadata\": {\n"
             + "    \"confidence\": \"high/medium/low\",\n"
             + "    \"unclear_sections\": [\"list of unclear areas if any\"],\n"
             + "    \"detected_languages\": [\"list of languages found\"]\n"
             + "  }\n"
             + "}";
// This concatenated version is much safer against "Unterminated string literal" errors from esbuild/Vite.

// The user should replace the prompt definition in src/services/geminiService.ts with this concatenated version.

    const response = await aiClient.models.generateContent({
        model: model,
        contents: [imagePart, { text: prompt }],
    });

    const responseText = response.text.trim();

    if (!responseText) {
        throw new Error("Gemini API returned an empty response.");
    }

    try {
        // The model sometimes wraps the JSON in markdown code fences (```json ... ```)
        // This regex attempts to clean the response before parsing.
        const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
        const jsonString = jsonMatch ? jsonMatch[1] : responseText;
        
        const result = JSON.parse(jsonString) as OcrResult;
        return result;
    } catch (e) {
        console.error("Failed to parse JSON response from Gemini API:", e);
        throw new Error(`Invalid JSON format from API. Raw response: ${responseText}`);
    }
};
```
