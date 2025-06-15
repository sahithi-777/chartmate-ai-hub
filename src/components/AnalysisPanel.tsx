
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SummaryView } from "./features/SummaryView";
import { InsightsView } from "./features/InsightsView";
import { QuizView } from "./features/QuizView";
import { ForecastView } from "./features/ForecastView";

export function AnalysisPanel() {
  return (
    <div className="grid md:grid-cols-2 gap-6 p-4 md:p-6 animate-fade-in">
      <div className="space-y-6">
        <Card className="overflow-hidden shadow-lg">
          <CardContent className="p-0">
             <img
              src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=2070&auto=format&fit=crop"
              alt="Chart for analysis"
              className="w-full h-auto object-cover"
            />
          </CardContent>
        </Card>
      </div>
      <div className="space-y-6">
        <Tabs defaultValue="summary">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
            <TabsTrigger value="forecast">Forecast</TabsTrigger>
          </TabsList>
          <TabsContent value="summary" className="mt-4">
            <SummaryView />
          </TabsContent>
          <TabsContent value="insights" className="mt-4">
            <InsightsView />
          </TabsContent>
          <TabsContent value="quiz" className="mt-4">
            <QuizView />
          </TabsContent>
          <TabsContent value="forecast" className="mt-4">
            <ForecastView />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
