
import { useQuery } from '@tanstack/react-query';
import { analyzeChartWithGemini } from '@/services/geminiService';

export const useGeminiAnalysis = (file: File | null, prompt: string, enabled = true) => {
  return useQuery({
    queryKey: ['gemini-analysis', file?.name, prompt],
    queryFn: async () => {
      if (!file) {
        throw new Error('File is missing.');
      }
      return analyzeChartWithGemini(file, prompt);
    },
    enabled: !!file && enabled,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
