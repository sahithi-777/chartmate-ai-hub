
import { GoogleGenerativeAI, Part } from "@google/generative-ai";

async function fileToGenerativePart(file: File): Promise<Part> {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
}

export async function analyzeChartWithGemini(apiKey: string, file: File, prompt: string) {
  if (!apiKey) {
    throw new Error("Gemini API key is not set.");
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

  const imagePart = await fileToGenerativePart(file);

  const result = await model.generateContent([prompt, imagePart]);
  const response = result.response;
  const text = response.text();
  return text;
}
