
import { useState } from 'react';
import { Bot } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useApiKey } from '@/contexts/ApiKeyContext';
import { useGeminiAnalysis } from '@/hooks/useGeminiAnalysis';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface SummaryViewProps {
  file: File;
}

const ApiKeyInput = () => {
    const { setApiKey } = useApiKey();
    const [key, setKey] = useState("");

    return (
        <Card>
            <CardHeader>
                <CardTitle>Gemini API Key Required</CardTitle>
                <CardDescription>
                    Please enter your Google Gemini API key to enable analysis. Your key will be stored locally in your browser.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex w-full items-center space-x-2">
                    <Input type="password" placeholder="Enter API Key" value={key} onChange={(e) => setKey(e.target.value)} />
                    <Button type="submit" onClick={() => setApiKey(key)}>Save Key</Button>
                </div>
                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:underline mt-2 block">
                    Get an API key from Google AI Studio.
                </a>
            </CardContent>
        </Card>
    );
};

export function SummaryView({ file }: SummaryViewProps) {
  const { apiKey } = useApiKey();
  const prompt = "In 2-3 sentences, provide a high-level summary of the data presented in this chart.";
  const { data, isLoading, isError, error } = useGeminiAnalysis(file, prompt);

  if (!apiKey) {
      return <ApiKeyInput />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          AI Summary
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
                    {error.message} Could your API key be invalid?
                </AlertDescription>
            </Alert>
        )}
        {data && <p className="text-muted-foreground whitespace-pre-wrap">{data}</p>}
      </CardContent>
    </Card>
  );
}
