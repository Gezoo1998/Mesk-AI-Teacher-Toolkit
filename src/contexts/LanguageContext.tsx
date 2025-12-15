'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { translations, Language } from '@/lib/i18n/translations';

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string; // Simple key accessor (e.g. 'sidebar.schoolName')
    dir: 'ltr' | 'rtl';
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en');

    useEffect(() => {
        // Load preference
        const stored = localStorage.getItem('mesk-lang') as Language;
        if (stored === 'en' || stored === 'ar') {
            setLanguageState(stored);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('mesk-lang', lang);
        // Update HTML dir and lang attributes for accessibility/styling
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    };

    // Helper to access nested keys like 'sidebar.title'
    const t = (path: string): string => {
        const keys = path.split('.');
        let current: any = translations[language];
        for (const key of keys) {
            if (current[key] === undefined) return path;
            current = current[key];
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
