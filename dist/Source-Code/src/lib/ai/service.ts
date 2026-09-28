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

function getCandidateModels(): string[] {
    const configured = process.env.GROQ_MODEL;
    const candidates = [
        configured,
        'openai/gpt-oss-120b',
        'allam-2-7b',
        'llama-3.3-70b-versatile',
        'llama-3.1-8b-instant',
        'openai/gpt-oss-20b'
    ].filter(Boolean) as string[];

    return Array.from(new Set(candidates));
}

export async function generateContent(request: GenerateRequest): Promise<GenerateResponse> {
    try {
        const { system, user } = buildPrompt(request.toolId, request.payload, request.language);
        const models = getCandidateModels();
        let completion;
        let lastError: unknown;

        for (const model of models) {
            try {
                completion = await getGroq().chat.completions.create({
                    messages: [
                        { role: 'system', content: system },
                        { role: 'user', content: user },
                    ],
                    model,
                    temperature: 0.7,
                    max_tokens: 4096,
                    response_format: { type: "json_object" }
                });
                break;
            } catch (err: any) {
                lastError = err;
                if (err?.status === 404 || err?.error?.code === 'model_not_found') {
                    console.warn(`[Groq] Model ${model} not available, trying next fallback...`);
                    continue;
                }
                throw err;
            }
        }

        if (!completion) {
            throw lastError || new Error('No compatible Groq model available');
        }

        const rawContent = completion.choices[0]?.message?.content || '';
        
        try {
            const structuredContent = JSON.parse(rawContent);
            return {
                success: true,
                content: rawContent,
                structuredContent: structuredContent
            };
        } catch (parseError) {
            console.error('JSON Parse Error:', parseError, rawContent);
            return {
                success: true,
                content: rawContent
            };
        }
    } catch (error) {
        console.error('Groq AI Error:', error);
        return {
            success: false,
            error: 'Failed to generate content via AI.'
        };
    }
}

export async function createChatStream(request: GenerateRequest) {
    const { system, user } = buildPrompt(request.toolId, request.payload, request.language);
    const models = getCandidateModels();
    let lastError: unknown;

    for (const model of models) {
        try {
            return await getGroq().chat.completions.create({
                messages: [
                    { role: 'system', content: system },
                    { role: 'user', content: user },
                ],
                model,
                temperature: 0.7,
                max_tokens: 4096,
                stream: true,
            });
        } catch (err: any) {
            lastError = err;
            if (err?.status === 404 || err?.error?.code === 'model_not_found') {
                console.warn(`[Groq] Model ${model} not available, trying next fallback...`);
                continue;
            }
            throw err;
        }
    }

    throw lastError || new Error('No compatible Groq model available');
}

export async function generateChatResponse(messages: ChatMessage[]): Promise<GenerateResponse> {
    try {
        const models = getCandidateModels();
        let completion;
        let lastError: unknown;

        for (const model of models) {
            try {
                completion = await getGroq().chat.completions.create({
                    messages: messages as { role: 'user' | 'assistant' | 'system'; content: string }[],
                    model,
                    temperature: 0.7,
                    max_tokens: 2048,
                });
                break;
            } catch (err: any) {
                lastError = err;
                if (err?.status === 404 || err?.error?.code === 'model_not_found') {
                    console.warn(`[Groq] Model ${model} not available, trying next fallback...`);
                    continue;
                }
                throw err;
            }
        }

        if (!completion) {
            throw lastError || new Error('No compatible Groq model available');
        }

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
