'use client';

import React, { createContext, useContext, useState } from 'react';
import { translations, Language } from '@/lib/i18n/translations';

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string; // Simple key accessor (e.g. 'sidebar.schoolName')
    dir: 'ltr' | 'rtl';
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>(() => {
        if (typeof window !== 'undefined') {
            try {
                const stored = (localStorage.getItem('almanhal-lang') || localStorage.getItem('mesk-lang')) as Language;
                if (stored === 'en' || stored === 'ar') return stored;
            } catch {
                // Safari Private Browsing mode throws SecurityError
            }
        }
        return 'en';
    });

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        try {
            if (typeof window !== 'undefined') {
                localStorage.setItem('almanhal-lang', lang);
                if (document?.documentElement) {
                    document.documentElement.lang = lang;
                    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
                }
            }
        } catch {
            // Safari storage exception safeguard
        }
    };

    // Helper to access nested keys like 'sidebar.title'
    const t = (path: string): string => {
        const keys = path.split('.');
        let current: Record<string, unknown> = translations[language];
        for (const key of keys) {
            if (!(key in current) || typeof current[key] !== 'object' || current[key] === null) {
                return typeof current[key] === 'string' ? current[key] as string : path;
            }
            current = current[key] as Record<string, unknown>;
        }
        return typeof current === 'string' ? current : path;
    };

    const dir = language === 'ar' ? 'rtl' : 'ltr';

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
            <div dir={dir} className={language === 'ar' ? 'font-sans-arabic' : 'font-sans'}>
                {children}
            </div>
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
