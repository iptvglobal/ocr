
import { GoogleGenAI, Part } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = 'gemini-2.5-flash';

/**
 * Extracts text from an image using the Gemini API.
 * @param imagePart The image data as a Generative Part.
 * @returns The extracted text as a string.
 */
export async function extractTextFromImage(imagePart: Part): Promise<string> {
  const prompt = "Extract all text from this image. Only return the text content, without any commentary, formatting, or labels.";
  
  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: { parts: [imagePart, { text: prompt }] },
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error extracting text from image:", error);
    throw new Error("Failed to extract text from the image via Gemini API.");
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
    const response = await ai.models.generateContent({
        model: model,
        contents: prompt
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error translating text:", error);
    throw new Error(`Failed to translate text to ${targetLanguage} via Gemini API.`);
  }
}
