'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function SidebarContent({ onItemClick }: { onItemClick?: () => void }) {
    const { t, language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ar' : 'en');
    };

    return (
        <div className="flex h-full w-full flex-col gap-6 px-2">
            {/* Language Toggle */}
            <div className="flex justify-end">
                <button
                    onClick={toggleLanguage}
                    className="group flex items-center gap-1.5 rounded-full border border-zinc-200/60 bg-white/80 backdrop-blur-sm px-4 py-1.5 text-xs font-bold shadow-sm transition-all hover:border-amber-400 hover:shadow-amber-500/10 hover:scale-105"
                    dir="ltr"
                >
                    <span className={cn("transition-colors", language === 'en' ? 'text-amber-600' : 'text-zinc-400 group-hover:text-zinc-600')}>EN</span>
                    <span className="h-3 w-[1px] bg-zinc-300"></span>
                    <span className={cn("transition-colors", language === 'ar' ? 'text-amber-600' : 'text-zinc-400 group-hover:text-zinc-600')}>عربي</span>
                </button>
            </div>

            <div className="flex flex-col items-center text-center space-y-6 mt-2">
                {/* School Badge */}
                <Link
                    href="/"
                    onClick={onItemClick}
                    className="group inline-flex items-center gap-2 rounded-full border border-amber-200/60 bg-gradient-to-r from-amber-50/80 to-yellow-50/50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-800 shadow-sm transition-all hover:border-amber-400 hover:shadow-md hover:-translate-y-0.5"
                >
                    <span className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.8)] animate-pulse" />
                    {t('sidebar.schoolName')}
                </Link>

                {/* Logo Area */}
                <div className="relative">
                    <div className="absolute inset-0 bg-amber-400/20 blur-3xl rounded-full opacity-50 animate-pulse" />
                    <Link
                        href="/"
                        onClick={onItemClick}
                        className="block relative h-32 w-32 transition-transform duration-300 hover:scale-105 active:scale-95"
                    >
                        <motion.img
                            src="/mesk.png"
                            alt={t('common.logoAlt')}
                            className="h-full w-full object-contain drop-shadow-2xl"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        />
                    </Link>
                </div>

                {/* Title */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-black tracking-tight text-zinc-900">
                        {t('sidebar.appName')}
                    </h1>
                    <p className="text-xs font-medium leading-relaxed text-zinc-500 max-w-[220px] mx-auto">
                        {t('sidebar.desc')}
                    </p>
                </div>
            </div>

            {/* Mode Section */}
            <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between px-1">
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-400">
                        {t('sidebar.currentMode')}
                    </p>
                    <div className="h-px flex-1 bg-zinc-100 ml-3"></div>
                </div>

                {/* AI Chat Link */}
                <Link
                    href="/chat"
                    onClick={onItemClick}
                    className="flex items-center gap-3 rounded-2xl border border-amber-200/50 bg-gradient-to-br from-amber-500 to-amber-600 p-4 text-white shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] group/chat"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md transition-transform group-hover/chat:rotate-12">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" /></svg>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-amber-100 uppercase tracking-widest">{t('chat.subtitle')}</p>
                        <p className="font-extrabold text-sm">{t('chat.title')}</p>
                    </div>
                </Link>

                <div className="rounded-2xl border border-white/60 bg-white/40 p-4 shadow-sm backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 text-amber-600 shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10v6" /><path d="M20 20a2 2 0 01-2 2H6a2 2 0 01-2-2V10" /><path d="M12 2L2 7l10 5 10-5-10-5z" /></svg>
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-semibold text-zinc-500">{t('sidebar.gradeLevel')}</p>
                            <p className="font-bold text-zinc-800">{t('sidebar.allGrades')}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Tip - pushed to bottom */}
            <div className="mt-auto pt-6">
                <div className="relative overflow-hidden rounded-2xl border border-amber-200/50 bg-gradient-to-br from-amber-50/80 to-yellow-50/50 p-5 shadow-lg shadow-amber-500/5">
                    <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-amber-400/10 blur-xl"></div>

                    <div className="relative z-10">
                        <div className="mb-2 flex items-center gap-2 text-amber-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="M2 12h20" /><circle cx="12" cy="12" r="10" /></svg>
                            <span className="text-[10px] font-extrabold uppercase tracking-widest">{t('sidebar.quickTip')}</span>
                        </div>
                        <p className="text-xs font-medium leading-relaxed text-zinc-600/90">
                            {t('sidebar.quickTipContent')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
