
import { useMutation } from '@tanstack/react-query';
import { analyzeTextWithGemini } from '@/services/geminiService';

export const useGeminiTextAnalysis = () => {
  return useMutation({
    mutationFn: (prompt: string) => analyzeTextWithGemini(prompt),
  });
};
