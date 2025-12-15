'use client';

import { useEffect, useState } from 'react';

const PREF_KEYS = {
    grade: 'mesk-pref-grade',
    subject: 'mesk-pref-subject',
    // Add more as needed
};

export function useUserPreferences() {
    const [preferences, setPreferences] = useState<Record<string, string>>({});
    const [isLoaded, setIsLoaded] = useState(false);

    // Load on mount
    useEffect(() => {
        const loaded: Record<string, string> = {};
        if (typeof window !== 'undefined') {
            loaded.grade = localStorage.getItem(PREF_KEYS.grade) || '';
            loaded.subject = localStorage.getItem(PREF_KEYS.subject) || '';
        }
        setPreferences(loaded);
        setIsLoaded(true);
    }, []);

    const updatePreference = (key: 'grade' | 'subject', value: string) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(PREF_KEYS[key], value);
            setPreferences(prev => ({ ...prev, [key]: value }));
        }
    };

    return { preferences, updatePreference, isLoaded };
}
