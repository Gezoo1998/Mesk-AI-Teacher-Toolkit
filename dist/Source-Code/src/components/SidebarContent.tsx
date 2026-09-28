'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { APP_CONFIG } from '@/config/app';

export function SidebarContent({ onItemClick }: { onItemClick?: () => void }) {
    const { t, language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ar' : 'en');
    };

    return (
        <div className="flex h-full w-full flex-col gap-6 px-2 relative">
            {/* Background Accent - Al Manhal Ambient Tint */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(43,80,143,0.06),transparent_70%)] pointer-events-none" />

            {/* Language Toggle */}
            <div className="flex justify-end relative z-10">
                <button
                    onClick={toggleLanguage}
                    className="group relative flex items-center rounded-full border border-zinc-200/80 bg-zinc-50/80 p-1 text-xs font-black shadow-sm transition-all hover:border-[#2B508F]/40 hover:shadow-md hover:shadow-blue-500/5 active:scale-95"
                    dir="ltr"
                    title={language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
                >
                    <span className={cn(
                        "rounded-full px-3 py-1 transition-all duration-300",
                        language === 'en' 
                            ? "bg-[#2B508F] text-white shadow-sm font-black" 
                            : "text-zinc-500 hover:text-zinc-800"
                    )}>EN</span>
                    <span className={cn(
                        "rounded-full px-3 py-1 transition-all duration-300",
                        language === 'ar' 
                            ? "bg-[#2B508F] text-white shadow-sm font-black" 
                            : "text-zinc-500 hover:text-zinc-800"
                    )}>عربي</span>
                </button>
            </div>

            <div className="flex flex-col items-center text-center space-y-6 mt-1 relative z-10">
                {/* School Badge - Al Manhal Royal Blue Living Style */}
                <Link
                    href="/"
                    onClick={onItemClick}
                    className="group relative inline-flex items-center gap-2.5 rounded-full border border-blue-100 bg-gradient-to-r from-blue-50/80 to-white px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-800 shadow-md shadow-blue-900/5 transition-all hover:border-[#2B508F]/40 hover:-translate-y-0.5 active:scale-95"
                >
                    <div className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-[#2B508F] animate-ping opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2B508F] shadow-[0_0_8px_rgba(43,80,143,0.8)]" />
                    </div>
                    {language === 'ar' ? (APP_CONFIG.orgNameAr || APP_CONFIG.orgName) : APP_CONFIG.orgName}
                </Link>

                {/* Logo Area */}
                <div className="relative px-4">
                    <div className="absolute inset-0 bg-blue-100/30 blur-3xl rounded-full" />
                    <Link
                        href="/"
                        onClick={onItemClick}
                        className="block relative h-32 w-32 transition-transform duration-500 hover:scale-110 active:scale-95 group"
                    >
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 100 }}
                            className="relative w-full h-full"
                        >
                            <Image
                                src={APP_CONFIG.logoPath}
                                alt={t('common.logoAlt')}
                                fill
                                className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.12)] transition-all group-hover:drop-shadow-[0_25px_40px_rgba(43,80,143,0.25)]"
                                priority
                            />
                        </motion.div>
                    </Link>
                </div>

                {/* Title */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-black tracking-tight text-zinc-900 bg-clip-text text-transparent bg-gradient-to-b from-[#1E255E] to-zinc-700">
                        {t('sidebar.appName')}
                    </h1>
                    <p className="text-xs font-semibold leading-relaxed text-zinc-500 max-w-[220px] mx-auto opacity-80">
                        {t('sidebar.desc')}
                    </p>
                </div>
            </div>

            {/* Mode Section */}
            <div className="mt-4 space-y-4 relative z-10">
                <div className="flex items-center justify-between px-1">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-zinc-400">
                        {t('sidebar.currentMode')}
                    </p>
                    <div className="h-px flex-1 bg-zinc-100 ml-4"></div>
                </div>

                {/* AI Chat Link - Al Manhal Gradient */}
                <Link
                    href="/chat"
                    onClick={onItemClick}
                    className="group/chat relative flex items-center gap-4 overflow-hidden rounded-[24px] border border-blue-200/60 bg-gradient-to-br from-white to-blue-50/20 p-4 shadow-lg shadow-blue-900/5 transition-all hover:scale-[1.02] hover:border-[#2B508F]/50 hover:shadow-xl hover:shadow-blue-900/10 active:scale-[0.98]"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1E255E] via-[#2B508F] to-[#4378A0] opacity-[0.04] group-hover/chat:opacity-[0.08] transition-opacity" />
                    <div className="absolute inset-0 -translate-x-full group-hover/chat:animate-shimmer bg-gradient-to-r from-transparent via-blue-500/10 to-transparent pointer-events-none" />
                    
                    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1E255E] to-[#2B508F] text-white shadow-md shadow-blue-900/25 transition-transform group-hover/chat:rotate-6 group-hover/chat:scale-105">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" /></svg>
                    </div>
                    
                    <div className="relative">
                        <div className="flex items-center gap-2 mb-0.5">
                            <p className="text-[10px] font-black text-[#2B508F] uppercase tracking-widest">{t('chat.subtitle')}</p>
                            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <p className="font-black text-base text-zinc-900 leading-tight">{t('chat.title')}</p>
                    </div>
                </Link>

                {/* Grade Info - Premium Card */}
                <div className="group relative rounded-[24px] border border-zinc-200/70 bg-white p-4 shadow-sm transition-all hover:border-blue-200 hover:shadow-md hover:shadow-zinc-200/50">
                    <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50/60 text-[#2B508F] shadow-inner group-hover:bg-blue-100/60 group-hover:text-[#1E255E] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10v6" /><path d="M20 20a2 2 0 01-2 2H6a2 2 0 01-2-2V10" /><path d="M12 2L2 7l10 5 10-5-10-5z" /></svg>
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest mb-0.5">{t('sidebar.gradeLevel')}</p>
                            <p className="font-black text-sm text-zinc-800 tracking-tight">{t('sidebar.allGrades')}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Tip - Floating Premium Card in Al Manhal Colors */}
            <div className="mt-auto pt-6 relative z-10">
                <div className="group relative overflow-hidden rounded-[24px] border border-blue-100 bg-gradient-to-b from-white via-blue-50/30 to-blue-50/50 p-5 shadow-lg shadow-blue-950/5 transition-all hover:border-blue-200">
                    <div className="absolute top-0 right-0 -mr-4 -mt-4 h-24 w-24 rounded-full bg-blue-200/20 blur-2xl transition-opacity group-hover:opacity-50" />
                    
                    <div className="relative z-10">
                        <div className="mb-2.5 flex items-center gap-2 text-[#2B508F]">
                            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 ring-4 ring-blue-50/50 text-[#2B508F]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="M2 12h20" /><circle cx="12" cy="12" r="10" /></svg>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t('sidebar.quickTip')}</span>
                        </div>
                        <p className="text-xs font-bold leading-relaxed text-zinc-600 antialiased">
                            {t('sidebar.quickTipContent')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
