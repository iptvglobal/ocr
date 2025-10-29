import { GoogleGenAI, Part } from "@google/genai";

// As per guidelines, initialize the client directly.
// The API key MUST be available in process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const model = 'gemini-2.5-flash';

/**
 * Extracts text from an image using the Gemini API.
 * @param imagePart The image data as a Generative Part.
 * @returns The extracted text as a string.
 */
export async function extractTextFromImage(imagePart: Part): Promise<string> {
  const prompt = "Extract all text from this image. Preserve the original formatting as much as possible. Only return the text content, without any commentary or labels.";
  
  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: { parts: [imagePart, { text: prompt }] },
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error extracting text from image:", error);
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
    const response = await ai.models.generateContent({
        model: model,
        contents: prompt
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error translating text:", error);
    if (error instanceof Error) {
        throw error;
    }
    throw new Error(`An unexpected error occurred while translating text to ${targetLanguage}.`);
  }
}
