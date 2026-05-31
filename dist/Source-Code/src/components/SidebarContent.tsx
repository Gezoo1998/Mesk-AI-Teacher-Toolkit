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
            {/* Background Accent */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.03),transparent_70%)] pointer-events-none" />

            {/* Language Toggle */}
            <div className="flex justify-end relative z-10">
                <button
                    onClick={toggleLanguage}
                    className="group flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white/80 backdrop-blur-sm px-4 py-1.5 text-xs font-bold shadow-sm transition-all hover:border-amber-400 hover:shadow-amber-500/10 hover:scale-105 active:scale-95"
                    dir="ltr"
                >
                    <span className={cn("transition-colors", language === 'en' ? 'text-amber-600' : 'text-zinc-400 group-hover:text-zinc-600')}>EN</span>
                    <span className="h-3 w-[1px] bg-zinc-300"></span>
                    <span className={cn("transition-colors", language === 'ar' ? 'text-amber-600' : 'text-zinc-400 group-hover:text-zinc-600')}>عربي</span>
                </button>
            </div>

            <div className="flex flex-col items-center text-center space-y-6 mt-2 relative z-10">
                {/* School Badge - Premium Living Style */}
                <Link
                    href="/"
                    onClick={onItemClick}
                    className="group relative inline-flex items-center gap-2.5 rounded-full border-2 border-zinc-100 bg-white px-5 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-zinc-800 shadow-xl shadow-zinc-200/50 transition-all hover:border-amber-400/50 hover:-translate-y-0.5"
                >
                    <div className="relative h-2 w-2">
                        <span className="absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-75" />
                        <span className="relative block h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                    </div>
                    {APP_CONFIG.orgName}
                </Link>

                {/* Logo Area */}
                <div className="relative px-4">
                    <div className="absolute inset-0 bg-amber-100/20 blur-3xl rounded-full" />
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
                                className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.12)] transition-all group-hover:drop-shadow-[0_25px_40px_rgba(245,150,11,0.2)]"
                                priority
                            />
                        </motion.div>
                    </Link>
                </div>

                {/* Title */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-black tracking-tight text-zinc-900 bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 to-zinc-600">
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

                {/* AI Chat Link - Animated Premium Gradient */}
                <Link
                    href="/chat"
                    onClick={onItemClick}
                    className="group/chat relative flex items-center gap-4 overflow-hidden rounded-[24px] border border-amber-500/20 bg-white p-4 shadow-2xl shadow-amber-500/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 opacity-[0.03] group-hover/chat:opacity-[0.06] transition-opacity" />
                    
                    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30 transition-transform group-hover/chat:rotate-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" /></svg>
                    </div>
                    
                    <div className="relative">
                        <p className="text-[10px] font-black text-amber-600/60 uppercase tracking-widest mb-0.5">{t('chat.subtitle')}</p>
                        <p className="font-black text-base text-zinc-900 leading-tight">{t('chat.title')}</p>
                    </div>
                </Link>

                {/* Grade Info - Premium Card */}
                <div className="group relative rounded-[24px] border-2 border-zinc-100/80 bg-white p-4 shadow-sm transition-all hover:border-amber-200 hover:shadow-lg hover:shadow-zinc-200/50">
                    <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-50 text-amber-600 shadow-inner group-hover:bg-amber-50 group-hover:text-amber-700 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10v6" /><path d="M20 20a2 2 0 01-2 2H6a2 2 0 01-2-2V10" /><path d="M12 2L2 7l10 5 10-5-10-5z" /></svg>
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest mb-0.5">{t('sidebar.gradeLevel')}</p>
                            <p className="font-black text-sm text-zinc-800 tracking-tight">{t('sidebar.allGrades')}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Tip - Floating Premium Card */}
            <div className="mt-auto pt-8 relative z-10">
                <div className="group relative overflow-hidden rounded-[28px] border-2 border-amber-100/50 bg-gradient-to-b from-white to-amber-50/30 p-6 shadow-xl shadow-amber-900/5">
                    <div className="absolute top-0 right-0 -mr-4 -mt-4 h-24 w-24 rounded-full bg-amber-200/20 blur-2xl transition-opacity group-hover:opacity-40" />
                    
                    <div className="relative z-10">
                        <div className="mb-3 flex items-center gap-2 text-amber-600">
                            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-100 ring-4 ring-amber-50">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="M2 12h20" /><circle cx="12" cy="12" r="10" /></svg>
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
