import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OutputDisplay } from './OutputDisplay';
import { LanguageProvider } from '@/contexts/LanguageContext';
import React from 'react';

// Mock html2canvas and jspdf
vi.mock('html2canvas', () => ({
    default: vi.fn().mockResolvedValue({
        toDataURL: () => 'data:image/png;base64,xxx'
    })
}));

vi.mock('jspdf', () => ({
    jsPDF: vi.fn().mockImplementation(() => ({
        addImage: vi.fn(),
        save: vi.fn(),
        internal: {
            pageSize: {
                getWidth: () => 210,
                getHeight: () => 297
            }
        }
    }))
}));

describe('OutputDisplay Component', () => {
    it('renders valid structured JSON correctly', () => {
        const structuredData = {
            title: 'Test Title',
            sections: [
                { heading: 'H1', content: 'Content 1' }
            ],
            metadata: {
                differentiationLevel: 'Standard'
            }
        };

        render(
            <LanguageProvider>
                <OutputDisplay content={JSON.stringify(structuredData)} />
            </LanguageProvider>
        );
        
        // Use queryByText and flexible matching to avoid issues with animations or tag nesting
        expect(screen.queryByText(/Test Title/i)).not.toBeNull();
        expect(screen.queryByText(/H1/i)).not.toBeNull();
        expect(screen.queryByText(/Content 1/i)).not.toBeNull();
    });

    it('handles JSON wrapped in markdown code blocks', () => {
        const rawContent = "Here is the result:\n```json\n" + JSON.stringify({
            title: 'Wrapped Title',
            sections: [{ heading: 'Section', content: 'Text' }]
        }) + "\n```";

        render(
            <LanguageProvider>
                <OutputDisplay content={rawContent} />
            </LanguageProvider>
        );
        
        expect(screen.queryByText(/Wrapped Title/i)).not.toBeNull();
    });

    it('falls back to raw markdown rendering if JSON is invalid', () => {
        const rawMarkdown = "Normal Markdown content here.";
        
        render(
            <LanguageProvider>
                <OutputDisplay content={rawMarkdown} />
            </LanguageProvider>
        );
        
        expect(screen.queryByText(/Normal Markdown content here/i)).not.toBeNull();
    });
});
