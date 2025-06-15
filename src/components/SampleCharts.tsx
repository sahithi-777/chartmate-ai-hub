
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface SampleChartsProps {
  onSelectSample: (file: File) => void;
}

const samples = [
  { name: 'Sales Data 2024', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', description: 'Monthly sales performance' },
  { name: 'User Engagement', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', description: 'Daily active users' },
  { name: 'Stock Performance', url: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&q=80', description: 'Stock market trends' },
  { name: 'Weather Patterns', url: 'https://images.unsplash.com/photo-1561476638-3e0d493b5b46?w=800&q=80', description: 'Temp. & precipitation' },
];

export function SampleCharts({ onSelectSample }: SampleChartsProps) {
  const [loadingSample, setLoadingSample] = useState<string | null>(null);

  const handleSampleClick = async (sample: typeof samples[0]) => {
    setLoadingSample(sample.name);
    toast.info("Loading sample chart...");
    try {
      // Using a cors proxy to avoid cors issues from unsplash
      const response = await fetch(`https://cors-anywhere.herokuapp.com/${sample.url}`);
      if (!response.ok) throw new Error("Failed to fetch image");
      const blob = await response.blob();
      const file = new File([blob], `${sample.name.replace(/\s/g, '_')}.jpg`, { type: 'image/jpeg' });
      onSelectSample(file);
    } catch (error) {
      console.error("Failed to load sample chart:", error);
      toast.error("Could not load sample chart. Please try another one.");
    } finally {
      setLoadingSample(null);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-center text-sm font-medium text-muted-foreground mb-4">Or try a sample</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {samples.map((sample) => (
          <div key={sample.name} className="cursor-pointer group" onClick={() => !loadingSample && handleSampleClick(sample)}>
            <Card className="overflow-hidden transition-all group-hover:shadow-lg group-hover:scale-105 duration-300 ease-in-out aspect-video flex items-center justify-center">
              <CardContent className="p-0 relative w-full h-full">
                <img src={sample.url} alt={sample.description} className="w-full h-full object-cover" />
                {loadingSample === sample.name && (
                  <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                )}
              </CardContent>
            </Card>
            <p className="text-xs text-center mt-2 text-muted-foreground group-hover:text-foreground transition-colors truncate">{sample.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
