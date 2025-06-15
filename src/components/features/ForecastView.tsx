
import { LineChart, Info, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useGeminiAnalysis } from '@/hooks/useGeminiAnalysis';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { useMemo } from 'react';
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ForecastData {
  forecast_points: { period: string; value: number | string }[];
  confidence: 'High' | 'Medium' | 'Low';
  explanation: string;
  disclaimer: string;
}

interface ForecastViewProps {
  file: File;
  isActive: boolean;
}

export function ForecastView({ file, isActive }: ForecastViewProps) {
  const prompt = `Analyze the time-series data in this chart. Generate a forecast for the next 3 data points. Return a single, valid JSON object with the following structure: { "forecast_points": [{"period": "Next Period 1", "value": "number or string forecast"}, {"period": "Next Period 2", "value": "forecast"}, {"period": "Next Period 3", "value": "forecast"}], "confidence": "High" | "Medium" | "Low", "explanation": "A brief explanation of the forecasting method used.", "disclaimer": "This is a statistical projection and not a guarantee of future performance." }. Do not include any other text or markdown formatting outside of the JSON object. Ensure the JSON is valid.`;

  const { data, isLoading, isError, error } = useGeminiAnalysis(file, prompt, isActive);

  const parsedForecastData = useMemo(() => {
    if (!data) return null;
    try {
      const jsonString = data.match(/```json\n([\s\S]*?)\n```/)?.[1] || data;
      const parsed = JSON.parse(jsonString) as ForecastData;
      // Basic validation
      if (parsed.forecast_points && parsed.confidence && parsed.explanation) {
        return parsed;
      }
      return null;
    } catch (e) {
      console.error("Failed to parse forecast data:", e);
      return null;
    }
  }, [data]);
  
  const getConfidenceColor = (confidence: 'High' | 'Medium' | 'Low') => {
    switch (confidence) {
      case 'High':
        return 'bg-green-500 hover:bg-green-500/90 text-white';
      case 'Medium':
        return 'bg-yellow-500 hover:bg-yellow-500/90 text-white';
      case 'Low':
        return 'bg-red-500 hover:bg-red-500/90 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LineChart className="h-5 w-5 text-primary" />
          Future Forecast
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading && (
            <div className="space-y-4">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full" />
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
        {data && parsedForecastData && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Predicted Data Points</h4>
                <Badge className={getConfidenceColor(parsedForecastData.confidence)}>
                  {parsedForecastData.confidence} Confidence
                </Badge>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Period</TableHead>
                    <TableHead className="text-right">Forecasted Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parsedForecastData.forecast_points.map((point, index) => (
                    <TableRow key={index}>
                      <TableCell>{point.period}</TableCell>
                      <TableCell className="text-right font-medium">{String(point.value)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div>
              <h4 className="font-semibold flex items-center gap-2 mb-2"><Info className="h-4 w-4" /> Explanation</h4>
              <p className="text-sm text-muted-foreground">{parsedForecastData.explanation}</p>
            </div>
          </div>
        )}
        {data && !isLoading && !parsedForecastData && (
          <Alert>
            <AlertTitle>Could not load forecast</AlertTitle>
            <AlertDescription>
              The AI generated an invalid format for the forecast. The raw data might be available but could not be parsed.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      {parsedForecastData && (
        <CardFooter>
            <Alert variant="default" className="w-full">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Disclaimer</AlertTitle>
              <AlertDescription>
                {parsedForecastData.disclaimer}
              </AlertDescription>
            </Alert>
        </CardFooter>
      )}
    </Card>
  );
}
