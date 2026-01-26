export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export interface GenerateRequest {
    toolId: string;
    payload: Record<string, unknown>; // Flexible payload for different forms
    language?: 'en' | 'ar';
}

export interface GenerateResponse {
    success: boolean;
    content?: string;
    error?: string;
}
