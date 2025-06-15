
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useApiKey } from '@/contexts/ApiKeyContext';

export const ApiKeyInput = () => {
    const { setApiKey } = useApiKey();
    const [key, setKey] = useState("");

    const handleSaveKey = () => {
        if (key.trim()) {
            setApiKey(key.trim());
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Gemini API Key Required</CardTitle>
                <CardDescription>
                    Please enter your Google Gemini API key to enable analysis. Your key will be stored locally in your browser.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex w-full items-center space-x-2">
                    <Input type="password" placeholder="Enter API Key" value={key} onChange={(e) => setKey(e.target.value)} />
                    <Button type="submit" onClick={handleSaveKey}>Save Key</Button>
                </div>
                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:underline mt-2 block">
                    Get an API key from Google AI Studio.
                </a>
            </CardContent>
        </Card>
    );
};
