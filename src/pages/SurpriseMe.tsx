
import { useState, useMemo } from 'react';
import { Wand2, Lightbulb, Bot, RefreshCw, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGeminiTextAnalysis } from '@/hooks/useGeminiTextAnalysis';
import { InteractiveQuiz, QuizQuestion } from '@/components/features/InteractiveQuiz';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Header } from '@/components/Header';

interface SurpriseData {
  scenario: {
    title: string;
    description: string;
  };
  summary: string;
  insights: string[];
  quiz: QuizQuestion[];
}

const SURPRISE_ME_PROMPT = `Generate a creative and fictional chart scenario. The scenario should be interesting and plausible. Based on this scenario, provide a detailed analysis. Return a single, valid JSON object with the following structure: { "scenario": { "title": "Fictional Chart Title", "description": "A 2-3 sentence description of what the fictional chart shows. Be creative, use topics like global coffee consumption trends, user engagement on a fantasy social media app, or monthly sales data for a flying car company." }, "summary": "A concise 2-3 sentence summary of the key information from the fictional chart.", "insights": [ "Insight 1 as a string.", "Insight 2 as a string.", "Insight 3 as a string." ], "quiz": [ { "question": "...", "options": ["..."], "answer": "...", "explanation": "..." }, { "question": "...", "options": ["..."], "answer": "...", "explanation": "..." }, { "question": "...", "options": ["..."], "answer": "...", "explanation": "..." } ] } Do not include any other text or markdown formatting outside of the JSON object. Ensure the JSON is valid.`;

const SurpriseMe = () => {
  const generateMutation = useGeminiTextAnalysis();

  const handleGenerate = () => {
    generateMutation.mutate(SURPRISE_ME_PROMPT);
  };

  const parsedData = useMemo(() => {
    if (!generateMutation.data) return null;
    try {
      const jsonString = generateMutation.data.match(/```json\n([\s\S]*?)\n```/)?.[1] || generateMutation.data;
      const parsed = JSON.parse(jsonString) as SurpriseData;
      if (parsed.scenario && parsed.summary && parsed.insights && parsed.quiz) {
        return parsed;
      }
      return null;
    } catch (e) {
      console.error("Failed to parse surprise data:", e);
      return null;
    }
  }, [generateMutation.data]);

  return (
    <div className="flex flex-col h-full">
      <Header title="Surprise Me!" />
      <div className="flex-1 overflow-auto p-4 md:p-6 space-y-6">
        <Card className="text-center animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <Wand2 className="h-6 w-6 text-primary" />
              Feeling Adventurous?
            </CardTitle>
            <CardDescription>
              Let our AI generate a fictional chart scenario and analyze it for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleGenerate} disabled={generateMutation.isPending}>
              {generateMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Generate a New Scenario
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {generateMutation.isPending && (
          <div className="text-center p-8 animate-fade-in">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="mt-4 text-muted-foreground">Our AI is brewing up a surprise...</p>
          </div>
        )}

        {generateMutation.isError && (
          <Alert variant="destructive">
            <AlertTitle>Generation Failed</AlertTitle>
            <AlertDescription>
              {generateMutation.error instanceof Error ? generateMutation.error.message : "An unknown error occurred. Please try again."}
            </AlertDescription>
          </Alert>
        )}
        
        {generateMutation.data && !parsedData && !generateMutation.isPending && (
          <Alert variant="destructive">
            <AlertTitle>Parsing Failed</AlertTitle>
            <AlertDescription>
              The AI returned data in an unexpected format. Please try generating a new scenario.
            </AlertDescription>
          </Alert>
        )}

        {parsedData && (
          <div className="space-y-6 animate-fade-in">
            <Card className="bg-muted/20">
              <CardHeader>
                <CardTitle>{parsedData.scenario.title}</CardTitle>
                <CardDescription>
                  {parsedData.scenario.description}
                </CardDescription>
              </CardHeader>
            </Card>

            <Tabs defaultValue="summary">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
                <TabsTrigger value="quiz">Quiz</TabsTrigger>
              </TabsList>
              <TabsContent value="summary" className="mt-4">
                 <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bot className="h-5 w-5 text-primary" />
                        AI Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{parsedData.summary}</p>
                    </CardContent>
                  </Card>
              </TabsContent>
              <TabsContent value="insights" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-primary" />
                      Key Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                      {parsedData.insights.map((insight, index) => (
                        <li key={index}>{insight}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="quiz" className="mt-4">
                <InteractiveQuiz questions={parsedData.quiz} onGenerateNew={handleGenerate} />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default SurpriseMe;
