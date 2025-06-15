
import { LineChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ForecastView() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LineChart className="h-5 w-5 text-primary" />
          Future Forecast
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-muted-foreground">This feature is coming soon! The AI will provide a forecast based on your data.</p>
      </CardContent>
    </Card>
  );
}
