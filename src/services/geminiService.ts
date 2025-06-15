import { supabase } from "@/integrations/supabase/client";

async function fileToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = error => reject(error);
    });
}

export async function analyzeChartWithGemini(file: File, prompt: string) {
    const imageBase64 = await fileToBase64(file);
    const imageMimeType = file.type;

    const { data, error } = await supabase.functions.invoke('gemini-analysis', {
        body: { prompt, imageBase64, imageMimeType },
    });

    if (error) {
        throw new Error(`Edge function invocation failed: ${error.message}`);
    }

    if (data.error) {
        throw new Error(`Gemini analysis failed: ${data.error}`);
    }
    
    return data.text;
}

export async function analyzeTextWithGemini(prompt: string) {
    const { data, error } = await supabase.functions.invoke('gemini-text-analysis', {
        body: { prompt },
    });

    if (error) {
        throw new Error(`Edge function invocation failed: ${error.message}`);
    }

    if (data.error) {
        throw new Error(`Gemini analysis failed: ${data.error}`);
    }
    
    return data.text;
}
