'use client';

import { useState } from 'react';

const PREF_KEYS = {
    grade: 'mesk-pref-grade',
    subject: 'mesk-pref-subject',
    // Add more as needed
};

export function useUserPreferences() {
    const [preferences, setPreferences] = useState<Record<string, string>>(() => {
        if (typeof window !== 'undefined') {
            return {
                grade: localStorage.getItem(PREF_KEYS.grade) || '',
                subject: localStorage.getItem(PREF_KEYS.subject) || ''
            };
        }
        return { grade: '', subject: '' };
    });


    const updatePreference = (key: 'grade' | 'subject', value: string) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(PREF_KEYS[key], value);
            setPreferences(prev => ({ ...prev, [key]: value }));
        }
    };

    return { preferences, updatePreference, isLoaded: true };
}
