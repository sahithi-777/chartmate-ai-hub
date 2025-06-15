
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileText, Clock, BarChart } from "lucide-react";
import { Link } from "react-router-dom";

async function fetchAnalyses(userId: string) {
  const { data, error } = await supabase
    .from("analyses")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export function AnalysisHistory() {
  const { user } = useAuth();

  const { data: analyses, isLoading, isError, error } = useQuery({
    queryKey: ["analyses", user?.id],
    queryFn: () => {
        if (!user) return Promise.resolve([]);
        return fetchAnalyses(user.id)
    },
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error fetching analyses</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  if (!analyses || analyses.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 border-2 border-dashed rounded-lg">
            <BarChart className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold">No Saved Analyses</h2>
            <p className="text-muted-foreground mt-2">
              You haven't saved any chart analyses yet.
            </p>
            <p className="text-muted-foreground">
              <Link to="/dashboard" className="text-primary hover:underline">Go to the dashboard</Link> to analyze and save a new chart.
            </p>
        </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {analyses.map((analysis) => (
        <Card key={analysis.id} className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 truncate text-lg">
              <FileText className="h-5 w-5 flex-shrink-0 text-primary" />
              <span className="truncate">{analysis.file_name}</span>
            </CardTitle>
            <CardDescription className="flex items-center gap-2 text-xs">
              <Clock className="h-4 w-4" />
              {new Date(analysis.created_at).toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground line-clamp-3">
              {analysis.summary || "No summary available."}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
