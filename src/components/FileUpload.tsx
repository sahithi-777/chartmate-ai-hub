
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadCloud } from "lucide-react";
import { useCallback } from "react";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

// Dummy file to simulate upload
const createDummyFile = () => {
  const blob = new Blob([""], { type: "image/png" });
  return new File([blob], "chart-placeholder.png", { type: "image/png" });
};

export function FileUpload({ onFileUpload }: FileUploadProps) {
  const handleFileSelect = () => {
    // In a real app, this would open a file dialog
    // For now, we'll just use a dummy file
    const dummyFile = createDummyFile();
    onFileUpload(dummyFile);
  };

  return (
    <div className="flex items-center justify-center h-full p-4 animate-fade-in">
      <Card className="w-full max-w-lg text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Upload Your Chart</CardTitle>
          <CardDescription>Drag & drop an image file or click to select</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg border-muted hover:border-primary transition-colors cursor-pointer" onClick={handleFileSelect}>
            <UploadCloud className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Supported formats: PNG, JPG, WEBP</p>
            <Button className="mt-6" onClick={handleFileSelect}>Select File</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
