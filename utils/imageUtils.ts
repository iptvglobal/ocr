
import { Part } from "@google/genai";

/**
 * Converts a File object to a Google AI GenerativePart.
 * @param file The image file to convert.
 * @returns A promise that resolves to a GenerativePart object.
 */
export function fileToGenerativePart(file: File): Promise<Part> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result !== 'string') {
        return reject(new Error('File reader did not return a string.'));
      }
      // The result is a data URL, e.g., "data:image/jpeg;base64,..."
      // We need to extract the base64 part.
      const base64Data = reader.result.split(',')[1];
      if (!base64Data) {
        return reject(new Error('Could not extract base64 data from file.'));
      }
      resolve({
        inlineData: {
          mimeType: file.type,
          data: base64Data,
        },
      });
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}
