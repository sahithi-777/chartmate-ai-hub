
import { HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function QuizView() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-primary" />
          Data Quiz
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-muted-foreground">This feature is coming soon! The AI will generate a quiz about your chart here.</p>
      </CardContent>
    </Card>
  );
}
