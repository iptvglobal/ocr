
import { GoogleGenAI, Part } from "@google/genai";

// Lazily initialize to avoid crashing the app on module load if API_KEY is missing.
let ai: GoogleGenAI | null = null;

/**
 * Initializes and returns the GoogleGenAI client instance.
 * Throws an error if the API_KEY environment variable is not set.
 * @returns An instance of GoogleGenAI.
 */
const getAiClient = (): GoogleGenAI => {
  if (!process.env.API_KEY) {
    throw new Error("Configuration Error: The API_KEY environment variable is not set. Please add it to your deployment's variables and redeploy the application.");
  }

  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  return ai;
};

const model = 'gemini-2.5-flash';

/**
 * Extracts text from an image using the Gemini API.
 * @param imagePart The image data as a Generative Part.
 * @returns The extracted text as a string.
 */
export async function extractTextFromImage(imagePart: Part): Promise<string> {
  const prompt = "Extract all text from this image. Only return the text content, without any commentary, formatting, or labels.";
  
  try {
    const client = getAiClient(); // This will throw if the key is missing.
    const response = await client.models.generateContent({
        model: model,
        contents: { parts: [imagePart, { text: prompt }] },
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error extracting text from image:", error);
    // Re-throw the original error to be caught by the UI component.
    // This preserves specific messages like the API key error.
    if (error instanceof Error) {
        throw error;
    }
    throw new Error("An unexpected error occurred while extracting text from the image.");
  }
}

/**
 * Translates text to a target language using the Gemini API.
 * @param text The text to translate.
 * @param targetLanguage The language to translate the text into.
 * @returns The translated text as a string.
 */
export async function translateText(text: string, targetLanguage: string): Promise<string> {
  const prompt = `Translate the following text to ${targetLanguage}. Provide only the translated text, with no additional explanation or context.\n\nText to translate:\n"""\n${text}\n"""`;

  try {
    const client = getAiClient(); // This will throw if the key is missing.
    const response = await client.models.generateContent({
        model: model,
        contents: prompt
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error translating text:", error);
    // Re-throw the original error.
    if (error instanceof Error) {
        throw error;
    }
    throw new Error(`An unexpected error occurred while translating text to ${targetLanguage}.`);
  }
}
