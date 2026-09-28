'use client';

import { useState } from 'react';

const PREF_KEYS = {
    grade: 'almanhal-pref-grade',
    subject: 'almanhal-pref-subject',
    // Add more as needed
};

export function useUserPreferences() {
    const [preferences, setPreferences] = useState<Record<string, string>>(() => {
        if (typeof window !== 'undefined') {
            return {
                grade: localStorage.getItem(PREF_KEYS.grade) || localStorage.getItem('mesk-pref-grade') || '',
                subject: localStorage.getItem(PREF_KEYS.subject) || localStorage.getItem('mesk-pref-subject') || ''
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
