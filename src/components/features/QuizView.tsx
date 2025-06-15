
import { HelpCircle, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGeminiAnalysis } from '@/hooks/useGeminiAnalysis';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { InteractiveQuiz } from './InteractiveQuiz';
import { useMemo } from 'react';
import { Button } from "../ui/button";

interface QuizViewProps {
  file: File;
  isActive: boolean;
}

export function QuizView({ file, isActive }: QuizViewProps) {
  const prompt = "Based on this chart, generate 5 multiple-choice questions in a valid JSON array format. Each object in the array should represent a question and have the following structure: { \"question\": string, \"options\": string[], \"answer\": string, \"explanation\": string }. The 'answer' should be the full text of the correct option. Ensure the JSON is valid and contains no other text or markdown formatting.";
  const { data, isLoading, isError, error, refetch } = useGeminiAnalysis(file, prompt, isActive);

  const parsedQuizData = useMemo(() => {
    if (!data) return null;
    try {
      // Handle cases where the response might be wrapped in markdown
      const jsonString = data.match(/```json\n([\s\S]*?)\n```/)?.[1] || data;
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
      return null;
    } catch (e) {
      console.error("Failed to parse quiz data:", e);
      return null;
    }
  }, [data]);
  
  const handleGenerateNew = () => {
    refetch();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-primary" />
          Data Quiz
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {isLoading && (
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </div>
        )}
        {isError && (
            <Alert variant="destructive">
                <AlertTitle>Analysis Failed</AlertTitle>
                <AlertDescription>
                    {error instanceof Error ? error.message : "An unknown error occurred."}
                </AlertDescription>
            </Alert>
        )}
        {data && parsedQuizData && (
          <InteractiveQuiz questions={parsedQuizData} onGenerateNew={handleGenerateNew} />
        )}
        {data && !isLoading && !parsedQuizData && (
          <Alert>
            <AlertTitle>Could not load quiz</AlertTitle>
            <AlertDescription>
              The AI generated an invalid format for the quiz. You can try generating a new one.
            </AlertDescription>
            <Button variant="outline" size="sm" onClick={handleGenerateNew} className="mt-4">
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate New Quiz
            </Button>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
