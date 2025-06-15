
import { useState } from "react";
import { Header } from "@/components/Header";
import { FileUpload } from "@/components/FileUpload";
import { AnalysisPanel } from "@/components/AnalysisPanel";

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
  };

  return (
    <div className="flex flex-col h-full">
      <Header title="Dashboard" />
      <div className="flex-1 overflow-auto">
        {!uploadedFile ? (
          <FileUpload onFileUpload={handleFileUpload} />
        ) : (
          <AnalysisPanel />
        )}
      </div>
    </div>
  );
};

export default Index;
