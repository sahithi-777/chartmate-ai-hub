
import { Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGeminiAnalysis } from '@/hooks/useGeminiAnalysis';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

interface AnomalyDetectionViewProps {
  file: File;
}

export function AnomalyDetectionView({ file }: AnomalyDetectionViewProps) {
  const prompt = "Identify any unusual or outlier data points";
  const { data, isLoading, isError, error } = useGeminiAnalysis(file, prompt);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Anomaly Detection
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
        {data && <p className="text-muted-foreground whitespace-pre-wrap">{data}</p>}
      </CardContent>
    </Card>
  );
}
