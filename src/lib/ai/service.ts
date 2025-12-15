import Groq from 'groq-sdk';
import { GenerateRequest, GenerateResponse } from './types';
import { buildPrompt } from './prompts';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function generateContent(request: GenerateRequest): Promise<GenerateResponse> {
    try {
        const { system, user } = buildPrompt(request.toolId, request.payload, request.language);

        const completion = await groq.chat.completions.create({
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
