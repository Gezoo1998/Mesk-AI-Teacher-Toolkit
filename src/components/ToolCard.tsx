'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Tool } from '@/lib/data/tools';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export function ToolCard({ tool }: { tool: Tool }) {
    const { t } = useLanguage();

    // Mapping color to classes with Premium Aesthetics
    const colorStyles = {
        amber: {
            bg: 'from-amber-50/90 to-white/70',
            border: 'border-amber-200/40 group-hover:border-amber-400/50',
            text: 'text-amber-950',
            icon: 'text-amber-600 bg-amber-100/60 shadow-inner',
            badge: 'bg-amber-100/70 text-amber-900 ring-amber-500/20 shadow-sm',
            shadow: 'shadow-[0_8px_30px_rgb(251,191,36,0.08)] group-hover:shadow-[0_20px_40px_rgba(251,191,36,0.18)]',
            glow: 'group-hover:from-amber-400/5 group-hover:to-amber-300/0'
        },
        emerald: {
            bg: 'from-emerald-50/90 to-white/70',
            border: 'border-emerald-200/40 group-hover:border-emerald-400/50',
            text: 'text-emerald-950',
            icon: 'text-emerald-600 bg-emerald-100/60 shadow-inner',
            badge: 'bg-emerald-100/70 text-emerald-900 ring-emerald-500/20 shadow-sm',
            shadow: 'shadow-[0_8px_30px_rgb(16,185,129,0.08)] group-hover:shadow-[0_20px_40px_rgba(16,185,129,0.18)]',
            glow: 'group-hover:from-emerald-400/5 group-hover:to-emerald-300/0'
        },
        sky: {
            bg: 'from-sky-50/90 to-white/70',
            border: 'border-sky-200/40 group-hover:border-sky-400/50',
            text: 'text-sky-950',
            icon: 'text-sky-600 bg-sky-100/60 shadow-inner',
            badge: 'bg-sky-100/70 text-sky-900 ring-sky-500/20 shadow-sm',
            shadow: 'shadow-[0_8px_30px_rgb(14,165,233,0.08)] group-hover:shadow-[0_20px_40px_rgba(14,165,233,0.18)]',
            glow: 'group-hover:from-sky-400/5 group-hover:to-sky-300/0'
        },
        purple: {
            bg: 'from-purple-50/90 to-white/70',
            border: 'border-purple-200/40 group-hover:border-purple-400/50',
            text: 'text-purple-950',
            icon: 'text-purple-600 bg-purple-100/60 shadow-inner',
            badge: 'bg-purple-100/70 text-purple-900 ring-purple-500/20 shadow-sm',
            shadow: 'shadow-[0_8px_30px_rgb(168,85,247,0.08)] group-hover:shadow-[0_20px_40px_rgba(168,85,247,0.18)]',
            glow: 'group-hover:from-purple-400/5 group-hover:to-purple-300/0'
        },
        rose: {
            bg: 'from-rose-50/90 to-white/70',
            border: 'border-rose-200/40 group-hover:border-rose-400/50',
            text: 'text-rose-950',
            icon: 'text-rose-600 bg-rose-100/60 shadow-inner',
            badge: 'bg-rose-100/70 text-rose-900 ring-rose-500/20 shadow-sm',
            shadow: 'shadow-[0_8px_30px_rgb(244,63,94,0.08)] group-hover:shadow-[0_20px_40px_rgba(244,63,94,0.18)]',
            glow: 'group-hover:from-rose-400/5 group-hover:to-rose-300/0'
        },
        indigo: {
            bg: 'from-indigo-50/90 to-white/70',
            border: 'border-indigo-200/40 group-hover:border-indigo-400/50',
            text: 'text-indigo-950',
            icon: 'text-indigo-600 bg-indigo-100/60 shadow-inner',
            badge: 'bg-indigo-100/70 text-indigo-900 ring-indigo-500/20 shadow-sm',
            shadow: 'shadow-[0_8px_30px_rgb(79,70,229,0.08)] group-hover:shadow-[0_20px_40px_rgba(79,70,229,0.18)]',
            glow: 'group-hover:from-indigo-400/5 group-hover:to-indigo-300/0'
        },
        slate: {
            bg: 'from-slate-50/90 to-white/70',
            border: 'border-slate-200/40 group-hover:border-slate-400/50',
            text: 'text-slate-950',
            icon: 'text-slate-600 bg-slate-100/60 shadow-inner',
            badge: 'bg-slate-100/70 text-slate-900 ring-slate-500/20 shadow-sm',
            shadow: 'shadow-[0_8px_30px_rgb(71,85,105,0.08)] group-hover:shadow-[0_20px_40px_rgba(71,85,105,0.18)]',
            glow: 'group-hover:from-slate-400/5 group-hover:to-slate-300/0'
        }
    };

    const styles = colorStyles[tool.color] || colorStyles.slate;

    return (
        <Link href={tool.href} className="block relative group h-full focus:outline-none focus:ring-2 focus:ring-amber-500/20 rounded-[2.5rem]">
            {/* The Outer Glow Layer - More subtle and precise */}
            <div className={cn(
                "absolute -inset-1 rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700 pointer-events-none",
                "bg-gradient-to-br",
                styles.glow
            )} />

            <motion.div
                whileHover={{ y: -10, scale: 1.01 }}
                whileTap={{ scale: 0.985 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={cn(
                    "relative flex h-full w-full flex-col gap-5 md:gap-6 rounded-[1.8rem] md:rounded-[2rem] border bg-gradient-to-br p-5 md:p-7 backdrop-blur-2xl transition-all duration-500",
                    styles.bg,
                    styles.border,
                    styles.shadow,
                    "ring-1 ring-white/60 shadow-2xl"
                )}
            >
                <div className="flex items-start justify-between">
                    <div className={cn(
                        "flex h-12 w-12 md:h-15 md:w-15 items-center justify-center rounded-2xl transition-all duration-700 group-hover:scale-110 group-hover:-rotate-3 shadow-md",
                        styles.icon
                    )}>
                        {tool.icon || (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-[28px] md:h-[28px]"><path d="M12 2v20" /><path d="M2 12h20" /><circle cx="12" cy="12" r="10" /></svg>
                        )}
                    </div>
                    <div className={cn(
                        "rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest ring-1 ring-inset shadow-inner transition-all duration-300",
                        styles.badge
                    )}>
                        {t(`tags.${tool.tags[0].replace(/[^a-zA-Z]/g, '').replace(/^\d+/, '').replace(/^./, c => c.toLowerCase())}`) || tool.tags[0]}
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className={cn("text-xl md:text-2xl font-black leading-tight tracking-tight scale-x-95 origin-left", styles.text)}>
                        {t(`tools.${tool.id}.title`)}
                    </h3>
                    <div className="min-h-[4.5rem] flex flex-col justify-start">
                        <p className="text-[15px] font-semibold leading-relaxed text-zinc-500/90 group-hover:text-zinc-700 transition-colors duration-300">
                            {t(`tools.${tool.id}.description`)}
                        </p>
                    </div>
                </div>

                <div className="mt-auto pt-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 group-hover:text-amber-700 transition-colors duration-500">
                        <span className="opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out">
                            {t('common.openTool')}
                        </span>
                        <div className="h-[2px] w-0 group-hover:w-8 bg-amber-500/30 transition-all duration-700" />
                    </div>

                    <motion.div
                        className="bg-white/60 p-2.5 rounded-full shadow-lg border border-white/80 transition-all duration-500 group-hover:bg-amber-50 group-hover:border-amber-200/50"
                        whileHover={{ scale: 1.15, rotate: 15 }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                            className="rtl:rotate-180 text-zinc-500 group-hover:text-amber-600 transition-colors"
                        >
                            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                        </svg>
                    </motion.div>
                </div>
            </motion.div>
        </Link>
    );
}
