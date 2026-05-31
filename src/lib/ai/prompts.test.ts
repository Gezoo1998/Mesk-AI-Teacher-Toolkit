import { describe, it, expect } from 'vitest';
import { buildPrompt, SYSTEM_PROMPT } from './prompts';

describe('buildPrompt logic', () => {
    const mockData = {
        lesson_title: 'Photosynthesis',
        subject: 'Science',
        grade: 'Primary 5'
    };

    it('returns the standard system prompt', () => {
        const { system } = buildPrompt('lesson-ideas', mockData);
        expect(system).toBe(SYSTEM_PROMPT);
    });

    it('injects differentiation level into user prompt when provided', () => {
        const { user } = buildPrompt('lesson-ideas', { ...mockData, differentiation: 'Challenge' });
        expect(user).toContain('DIFFERENTIATION LEVEL: Challenge');
    });

    it('replaces template placeholders correctly', () => {
        const { user } = buildPrompt('lesson-ideas', mockData);
        expect(user).toContain('Lesson Title: Photosynthesis');
        expect(user).toContain('Subject: Science');
        expect(user).toContain('Grade: Primary 5');
    });

    it('handles Arabic language instructions and English digits requirement', () => {
        const { user } = buildPrompt('lesson-ideas', mockData, 'ar');
        expect(user).toContain('العامية المصرية');
        expect(user).toContain('ENGLISH DIGITS');
    });

    it('includes Sources & References section for curriculum tools', () => {
        const { user } = buildPrompt('lesson-planner', mockData);
        expect(user).toContain('## Sources & References');
    });

    it('handles refinement mode correctly', () => {
        const refinementData = {
            refineType: 'make it shorter',
            currentContent: 'Some long lesson plan here...'
        };
        const { user } = buildPrompt('lesson-planner', refinementData);
        expect(user).toContain('Refine the following content by make it shorter');
        expect(user).toContain('Some long lesson plan here...');
    });
});
