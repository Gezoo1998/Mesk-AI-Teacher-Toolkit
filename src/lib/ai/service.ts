import Groq from 'groq-sdk';
import { GenerateRequest, GenerateResponse, ChatMessage } from './types';
import { buildPrompt } from './prompts';

let groqInstance: Groq | null = null;

function getGroq() {
    if (!groqInstance) {
        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            throw new Error('GROQ_API_KEY is not defined in environment variables');
        }
        groqInstance = new Groq({ apiKey });
    }
    return groqInstance;
}

export async function generateContent(request: GenerateRequest): Promise<GenerateResponse> {
    try {
        const { system, user } = buildPrompt(request.toolId, request.payload, request.language);

        const completion = await getGroq().chat.completions.create({
            messages: [
                { role: 'system', content: system },
                { role: 'user', content: user },
            ],
            model: 'llama-3.3-70b-versatile',
            temperature: 0.7,
            max_tokens: 2048,
        });

        const content = completion.choices[0]?.message?.content || '';

        return {
            success: true,
            content: content
        };
    } catch (error) {
        console.error('Groq AI Error:', error);
        return {
            success: false,
            error: 'Failed to generate content via AI.'
        };
    }
}

export async function generateChatResponse(messages: ChatMessage[]): Promise<GenerateResponse> {
    try {
        const completion = await getGroq().chat.completions.create({
            messages: messages,
            model: 'llama-3.3-70b-versatile',
            temperature: 0.7,
            max_tokens: 2048,
        });

        const content = completion.choices[0]?.message?.content || '';

        return {
            success: true,
            content: content
        };
    } catch (error) {
        console.error('Groq Chat Error:', error);
        return {
            success: false,
            error: 'Failed to get chat response.'
        };
    }
}
