
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut } from "lucide-react";
import { SummaryView } from "./features/SummaryView";
import { InsightsView } from "./features/InsightsView";
import { QuizView } from "./features/QuizView";
import { ForecastView } from "./features/ForecastView";
import { AnomalyDetectionView } from "./features/AnomalyDetectionView";

interface AnalysisPanelProps {
  file: File;
  onClearFile: () => void;
}

export function AnalysisPanel({ file, onClearFile }: AnalysisPanelProps) {
  const [zoom, setZoom] = useState(1);
  const [imageUrl, setImageUrl] = useState("");

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
        <Tabs defaultValue="summary">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
            <TabsTrigger value="forecast">Forecast</TabsTrigger>
            <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
          </TabsList>
          <TabsContent value="summary" className="mt-4">
            <SummaryView file={file} />
          </TabsContent>
          <TabsContent value="insights" className="mt-4">
            <InsightsView file={file} />
          </TabsContent>
          <TabsContent value="quiz" className="mt-4">
            <QuizView file={file} />
          </TabsContent>
          <TabsContent value="forecast" className="mt-4">
            <ForecastView file={file} />
          </TabsContent>
          <TabsContent value="anomalies" className="mt-4">
            <AnomalyDetectionView file={file} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
