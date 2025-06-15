
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Guide = () => {
  return (
    <div className="flex flex-col h-full">
      <Header title="User Guide" />
      <div className="flex-1 overflow-auto p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to ChartMate++!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Here's a quick guide to get you started:</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                <strong>Upload Your Chart:</strong> Navigate to the Dashboard and use the upload area to select a chart image from your device. We support formats like PNG, JPG, and GIF.
              </li>
              <li>
                <strong>AI-Powered Analysis:</strong> Once uploaded, our AI will automatically analyze your chart. Use the sidebar menu to explore different analysis features:
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li><strong>Summary:</strong> Get a quick, concise summary of what the chart represents.</li>
                  <li><strong>Insights:</strong> Discover deeper trends, patterns, and key takeaways from your data.</li>
                  <li><strong>Quiz:</strong> Test your understanding with an interactive quiz based on the chart's information.</li>
                  <li><strong>Forecast:</strong> (Coming soon!) Predict future trends based on historical data.</li>
                  <li><strong>Anomalies:</strong> (Coming soon!) Identify unusual data points that might require attention.</li>
                </ul>
              </li>
              <li>
                <strong>Manage Your Profile:</strong> Click on "Profile" in the sidebar to update your personal information.
              </li>
            </ol>
            <p>We're constantly improving ChartMate++. Stay tuned for more features!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Guide;
