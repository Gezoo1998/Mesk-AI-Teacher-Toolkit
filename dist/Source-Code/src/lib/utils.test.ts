import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
    it('merges class names correctly', () => {
        expect(cn('flex', 'items-center')).toBe('flex items-center');
    });

    it('handles conditional class names', () => {
        expect(cn('flex', true && 'items-center', false && 'justify-center')).toBe('flex items-center');
    });

    it('merges tailwind classes using twMerge', () => {
        // twMerge should resolve 'px-2 px-4' to 'px-4'
        const result = cn('px-2 py-1', 'px-4');
        expect(result).toContain('px-4');
        expect(result).toContain('py-1');
        expect(result).not.toContain('px-2');
    });

    it('handles undefined and null values', () => {
        expect(cn('flex', undefined, null, 'items-center')).toBe('flex items-center');
    });
});
