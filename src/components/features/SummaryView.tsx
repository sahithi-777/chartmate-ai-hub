
import { Bot } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SummaryView() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          AI Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-muted-foreground">The AI-powered summary of your chart will appear here.</p>
        <p className="text-sm text-blue-400">Connecting to Gemini for analysis...</p>
      </CardContent>
    </Card>
  );
}
