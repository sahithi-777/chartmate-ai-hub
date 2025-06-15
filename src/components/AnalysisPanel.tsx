
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Save, Loader2 } from "lucide-react";
import { SummaryView } from "./features/SummaryView";
import { InsightsView } from "./features/InsightsView";
import { QuizView } from "./features/QuizView";
import { ForecastView } from "./features/ForecastView";
import { AnomalyDetectionView } from "./features/AnomalyDetectionView";

interface AnalysisPanelProps {
  file: File;
  onClearFile: () => void;
}

const PROMPTS = {
  summary: "Provide a concise 2-3 sentence summary of the key information presented in this chart.",
  insights: "Analyze this chart and provide a list of key insights as bullet points. Focus on trends, patterns, and significant data points.",
  quiz: "Based on this chart, generate a 3-question multiple-choice quiz in JSON format. Each question should have 4 options and one correct answer.",
  anomalies: "Analyze this chart to identify any anomalies or outliers in the data. Describe them and suggest possible reasons.",
};

export function AnalysisPanel({ file, onClearFile }: AnalysisPanelProps) {
  const [zoom, setZoom] = useState(1);
  const [imageUrl, setImageUrl] = useState("");
  const [activeTab, setActiveTab] = useState("summary");
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const saveAnalysisMutation = useMutation({
    mutationFn: async () => {
      if (!user || !file) throw new Error("You must be logged in to save an analysis.");

      const summary = queryClient.getQueryData<string>(['gemini-analysis', file.name, PROMPTS.summary]);
      const insights = queryClient.getQueryData<string>(['gemini-analysis', file.name, PROMPTS.insights]);
      const quizData = queryClient.getQueryData<string>(['gemini-analysis', file.name, PROMPTS.quiz]);
      const anomaliesData = queryClient.getQueryData<string>(['gemini-analysis', file.name, PROMPTS.anomalies]);

      let parsedQuizData = null;
      if (quizData) {
        try {
          const jsonString = quizData.match(/```json\n([\s\S]*?)\n```/)?.[1] || quizData;
          parsedQuizData = JSON.parse(jsonString);
        } catch (e) {
          console.error("Failed to parse quiz data:", e);
          parsedQuizData = { raw: quizData }; // Save raw string if parsing fails
        }
      }

      const { error } = await supabase.from('analyses').insert({
        user_id: user.id,
        file_name: file.name,
        summary: summary || null,
        insights: insights || null,
        quiz_data: parsedQuizData,
        anomalies_data: anomaliesData ? { text: anomaliesData } : null,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Analysis saved successfully!");
      queryClient.invalidateQueries({ queryKey: ['analyses', user?.id] });
    },
    onError: (error: any) => {
      toast.error("Failed to save analysis.", { description: error.message });
    },
  });

  const canSave = !!(
    queryClient.getQueryData(['gemini-analysis', file?.name, PROMPTS.summary]) ||
    queryClient.getQueryData(['gemini-analysis', file?.name, PROMPTS.insights])
  );

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  return (
    <div className="grid md:grid-cols-2 gap-6 p-4 md:p-6 animate-fade-in">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={onClearFile}>
              New Upload
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => saveAnalysisMutation.mutate()}
                disabled={!canSave || saveAnalysisMutation.isPending}
              >
                {saveAnalysisMutation.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Analysis
              </Button>
              <Button variant="outline" size="icon" onClick={() => setZoom(z => z * 1.2)}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => setZoom(z => z / 1.2)}>
                <ZoomOut className="h-4 w-4" />
              </Button>
            </div>
        </div>
        <Card className="overflow-hidden shadow-lg">
          <CardContent className="p-0 flex items-center justify-center bg-muted/20 min-h-[300px]">
             {imageUrl && <img
              src={imageUrl}
              alt="Chart for analysis"
              className="w-full h-auto object-contain transition-transform duration-300"
              style={{ transform: `scale(${zoom})` }}
            />}
          </CardContent>
        </Card>
      </div>
      <div className="space-y-6">
        <Tabs defaultValue="summary" onValueChange={(value) => setActiveTab(value)}>
          <div className="relative w-full overflow-x-auto">
            <TabsList className="grid w-full grid-cols-5 min-w-[500px]">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
              <TabsTrigger value="quiz">Quiz</TabsTrigger>
              <TabsTrigger value="forecast">Forecast</TabsTrigger>
              <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="summary" className="mt-4">
            <SummaryView file={file} isActive={activeTab === 'summary'} />
          </TabsContent>
          <TabsContent value="insights" className="mt-4">
            <InsightsView file={file} isActive={activeTab === 'insights'} />
          </TabsContent>
          <TabsContent value="quiz" className="mt-4">
            <QuizView file={file} isActive={activeTab === 'quiz'} />
          </TabsContent>
          <TabsContent value="forecast" className="mt-4">
            <ForecastView file={file} isActive={activeTab === 'forecast'} />
          </TabsContent>
          <TabsContent value="anomalies" className="mt-4">
            <AnomalyDetectionView file={file} isActive={activeTab === 'anomalies'} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
