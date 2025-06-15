
import { Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGeminiAnalysis } from '@/hooks/useGeminiAnalysis';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

interface InsightsViewProps {
  file: File;
}

export function InsightsView({ file }: InsightsViewProps) {
  const prompt = "Analyze the provided chart and extract key insights. Present them as a bulleted list (using markdown). Focus on actionable information that a user can derive from the data.";
  const { data, isLoading, isError, error } = useGeminiAnalysis(file, prompt);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          Key Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {isLoading && (
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </div>
        )}
        {isError && (
            <Alert variant="destructive">
                <AlertTitle>Analysis Failed</AlertTitle>
                <AlertDescription>
                    {error instanceof Error ? error.message : "An unknown error occurred."}
                </AlertDescription>
            </Alergitt>
        )}
        {data && <p className="text-muted-foreground whitespace-pre-wrap">{data}</p>}
      </CardContent>
    </Card>
  );
}
