'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function SidebarContent() {
    const { t, language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ar' : 'en');
    };

    return (
        <div className="flex h-full w-full flex-col gap-6">
            {/* Language Toggle */}
            <div className="flex justify-end">
                <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-600 shadow-sm transition-all hover:border-amber-300 hover:text-amber-800"
                    dir="ltr"
                >
                    <span className={language === 'en' ? 'font-bold text-amber-600' : 'text-zinc-400'}>EN</span>
                    <span className="h-4 w-[1px] bg-zinc-200"></span>
                    <span className={language === 'ar' ? 'font-bold text-amber-600' : 'text-zinc-400'}>عربي</span>
                </button>
            </div>

            <div className="space-y-6 text-center">
                <Link href="/" className="group inline-flex items-center gap-2 rounded-full border border-amber-200/50 bg-gradient-to-r from-amber-50 to-yellow-50/50 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-amber-800 transition-all hover:border-amber-300 hover:shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                    {t('sidebar.schoolName')}
                </Link>

                <Link href="/" className="block relative mx-auto h-24 w-24">
                    <motion.img
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        src="/mesk.png"
                        alt="Mesk School Logo"
                        className="h-full w-full object-contain drop-shadow-xl"
                    />
                </Link>

                <div>
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-zinc-900">
                        <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">Mesk AI</span> Toolkit
                    </h1>
                    <p className="mt-2 text-xs font-medium leading-relaxed text-zinc-500 max-w-[200px] mx-auto">
                        {t('sidebar.desc')}
                    </p>
                </div>
            </div>

            <div className="space-y-4 border-t border-amber-100/50 pt-6">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700/80">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line x1="21.17" y1="8" x2="12" y2="8" /><line x1="3.95" y1="6.06" x2="8.54" y2="14" /><line x1="10.88" y1="21.94" x2="15.46" y2="14" /></svg>
                    {t('sidebar.currentMode')}
                </p>
                <div className="space-y-2.5">
                    <div className="group flex items-center justify-between rounded-xl border border-amber-100/50 bg-gradient-to-r from-white/50 to-amber-50/30 p-3 transition-colors hover:border-amber-200/50 hover:bg-amber-50/50">
                        <span className="text-xs font-semibold text-zinc-600">{t('sidebar.gradeLevel')}</span>
                        <span className="rounded-lg bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-900 shadow-sm ring-1 ring-zinc-100">
                            {t('sidebar.allGrades')}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-auto space-y-3 border-t border-amber-100/50 pt-6">
                <div className="rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 p-[1px] shadow-lg shadow-amber-500/10">
                    <div className="rounded-[11px] bg-white/95 p-4 backdrop-blur-sm">
                        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-amber-600">{t('sidebar.quickTip')}</p>
                        <p className="text-xs font-medium leading-relaxed text-zinc-600">
                            {t('sidebar.quickTipContent')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
