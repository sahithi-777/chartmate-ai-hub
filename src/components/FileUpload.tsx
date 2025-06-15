
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { UploadCloud, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

export function FileUpload({ onFileUpload }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
    if (fileRejections.length > 0) {
      fileRejections.forEach(({ errors }) => {
        errors.forEach((err: { code: string; message: string }) => {
          if (err.code === "file-too-large") {
            toast.error(`Error: File is larger than 10MB.`);
          } else if (err.code === "file-invalid-type") {
            toast.error(`Error: Invalid file type. Please upload PNG, JPG, or SVG.`);
          } else {
            toast.error(`Error: ${err.message}`);
          }
        });
      });
      return;
    }

    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      
      // Simulate upload progress
      setProgress(0);
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 100) {
            clearInterval(timer);
            return 100;
          }
          const diff = Math.random() * 20;
          return Math.min(oldProgress + diff, 100);
        });
      }, 100);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/svg+xml': ['.svg'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
  });

  const handleRemoveFile = () => {
    setFile(null);
    setProgress(0);
  };

  const handleUpload = () => {
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="flex items-center justify-center h-full p-4 animate-fade-in">
      <Card className="w-full max-w-lg text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Upload Your Chart</CardTitle>
          <CardDescription>Drag & drop an image or click to select a file</CardDescription>
        </CardHeader>
        <CardContent>
          {!file ? (
            <div
              {...getRootProps()}
              className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                isDragActive ? 'border-primary bg-primary/10' : 'border-muted hover:border-primary'
              }`}
            >
              <input {...getInputProps()} />
              <UploadCloud className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Supported: PNG, JPG, SVG (max 10MB)</p>
            </div>
          ) : (
            <div className="space-y-4 text-left">
              <Card>
                <CardContent className="p-4 flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img src={URL.createObjectURL(file)} alt="Preview" className="h-16 w-16 object-cover rounded-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleRemoveFile} className="flex-shrink-0">
                    <X className="h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>

              <div>
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-muted-foreground mt-2 text-center">
                  {progress < 100 ? `Uploading... ${Math.round(progress)}%` : 'Upload complete!'}
                </p>
              </div>
              
              <Button onClick={handleUpload} disabled={progress < 100} className="w-full">
                Analyze Chart
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
