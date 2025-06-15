
import { Header } from "@/components/Header";
import { AnalysisHistory } from "@/components/AnalysisHistory";

const History = () => {
  return (
    <div className="flex flex-col h-full">
      <Header title="Analysis History" />
      <main className="flex-1 p-4 md:p-6 overflow-auto">
        <AnalysisHistory />
      </main>
    </div>
  );
};

export default History;
