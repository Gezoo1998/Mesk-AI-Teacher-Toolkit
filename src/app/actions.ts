'use server'

import { generateContent } from "@/lib/ai/service";

export async function generateToolOutput(formData: FormData) {
    const toolId = formData.get('toolId') as string;
    const language = (formData.get('language') as 'en' | 'ar') || 'en';
    const rawData: Record<string, any> = {};

    formData.forEach((value, key) => {
        if (key !== 'toolId' && key !== 'language') {
            rawData[key] = value;
        }
    });

    if (!toolId) {
        return { success: false, error: 'Tool ID is required' };
    }

    try {
        const response = await generateContent({
            toolId,
            payload: rawData,
            language
        });
        return response;
    } catch (error) {
        console.error("Error generating content:", error);
        return { success: false, error: 'Failed to generate content' };
    }
}
