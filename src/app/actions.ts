'use server';

import { generateContent, generateChatResponse } from "@/lib/ai/service";
import { ChatMessage } from "@/lib/ai/types";

export async function generateToolOutput(formData: FormData) {
    const toolId = formData.get('toolId') as string;
    const language = (formData.get('language') as 'en' | 'ar') || 'en';
    const rawData: Record<string, string> = {};

    formData.forEach((value, key) => {
        if (key !== 'toolId' && key !== 'language') {
            rawData[key] = value as string;
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

export async function chatAction(messages: ChatMessage[]) {
    try {
        const response = await generateChatResponse(messages);
        return response;
    } catch (error) {
        console.error("Error in chat action:", error);
        return { success: false, error: 'Failed to process chat' };
    }
}
