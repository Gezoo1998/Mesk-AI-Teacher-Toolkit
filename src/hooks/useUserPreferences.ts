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
            try {
                return {
                    grade: localStorage.getItem(PREF_KEYS.grade) || localStorage.getItem('mesk-pref-grade') || '',
                    subject: localStorage.getItem(PREF_KEYS.subject) || localStorage.getItem('mesk-pref-subject') || ''
                };
            } catch {
                // Safari Private Browsing mode
            }
        }
        return { grade: '', subject: '' };
    });

    const updatePreference = (key: 'grade' | 'subject', value: string) => {
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem(PREF_KEYS[key], value);
            } catch {
                // Safari storage exception safeguard
            }
            setPreferences(prev => ({ ...prev, [key]: value }));
        }
    };

    return { preferences, updatePreference, isLoaded: true };
}
