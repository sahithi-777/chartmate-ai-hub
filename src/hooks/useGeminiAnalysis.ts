
import { useQuery } from '@tanstack/react-query';
import { analyzeChartWithGemini } from '@/services/geminiService';
import { useApiKey } from '@/contexts/ApiKeyContext';

export const useGeminiAnalysis = (file: File | null, prompt: string) => {
  const { apiKey } = useApiKey();

  return useQuery({
    queryKey: ['gemini-analysis', file?.name, prompt],
    queryFn: async () => {
      if (!apiKey) {
        throw new Error('API key is missing.');
      }
      if (!file) {
        throw new Error('File is missing.');
      }
      return analyzeChartWithGemini(apiKey, file, prompt);
    },
    enabled: !!apiKey && !!file,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
