'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Tool } from '@/lib/data/tools';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export function ToolCard({ tool }: { tool: Tool }) {
    const { t } = useLanguage();

    // Mapping color to classes
    const colorStyles = {
        amber: {
            bg: 'from-amber-50/50 to-white',
            border: 'hover:border-amber-300/50',
            text: 'text-amber-900',
            icon: 'text-amber-600 bg-amber-100',
            badge: 'bg-amber-100 text-amber-800 ring-amber-500/10'
        },
        emerald: {
            bg: 'from-emerald-50/50 to-white',
            border: 'hover:border-emerald-300/50',
            text: 'text-emerald-900',
            icon: 'text-emerald-600 bg-emerald-100',
            badge: 'bg-emerald-100 text-emerald-800 ring-emerald-500/10'
        },
        sky: {
            bg: 'from-sky-50/50 to-white',
            border: 'hover:border-sky-300/50',
            text: 'text-sky-900',
            icon: 'text-sky-600 bg-sky-100',
            badge: 'bg-sky-100 text-sky-800 ring-sky-500/10'
        },
        purple: {
            bg: 'from-purple-50/50 to-white',
            border: 'hover:border-purple-300/50',
            text: 'text-purple-900',
            icon: 'text-purple-600 bg-purple-100',
            badge: 'bg-purple-100 text-purple-800 ring-purple-500/10'
        },
        rose: {
            bg: 'from-rose-50/50 to-white',
            border: 'hover:border-rose-300/50',
            text: 'text-rose-900',
            icon: 'text-rose-600 bg-rose-100',
            badge: 'bg-rose-100 text-rose-800 ring-rose-500/10'
        },
        indigo: {
            bg: 'from-indigo-50/50 to-white',
            border: 'hover:border-indigo-300/50',
            text: 'text-indigo-900',
            icon: 'text-indigo-600 bg-indigo-100',
            badge: 'bg-indigo-100 text-indigo-800 ring-indigo-500/10'
        },
        slate: {
            bg: 'from-slate-50/50 to-white',
            border: 'hover:border-slate-300/50',
            text: 'text-slate-900',
            icon: 'text-slate-600 bg-slate-100',
            badge: 'bg-slate-100 text-slate-800 ring-slate-500/10'
        }
    };

    const styles = colorStyles[tool.color] || colorStyles.slate;

    return (
        <Link href={tool.href} className="block relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-white/50 to-white/0 rounded-[2rem] opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />

            <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={cn(
                    "relative flex w-full flex-col gap-4 rounded-3xl border border-white/60 bg-gradient-to-br p-6 shadow-sm backdrop-blur-sm transition-colors duration-300",
                    styles.bg,
                    styles.border
                )}
            >
                <div className="flex items-start justify-between">
                    <div className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
                        styles.icon
                    )}>
                        {tool.icon || (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="M2 12h20" /><circle cx="12" cy="12" r="10" /></svg>
                        )}
                    </div>
                    <div className={cn(
                        "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset",
                        styles.badge
                    )}>
                        {tool.tags[0]}
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className={cn("text-lg font-bold leading-tight", styles.text)}>
                        {t(`tools.${tool.id}.title`)}
                    </h3>
                    <p className="text-sm font-medium leading-relaxed text-zinc-500 line-clamp-2">
                        {t(`tools.${tool.id}.description`)}
                    </p>
                </div>

                <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 group-hover:text-amber-600 transition-colors">
                    <span>{t('common.openTool')}</span>
                    <motion.svg
                        xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="rtl:rotate-180"
                        animate={{ x: 0 }}
                        whileHover={{ x: 5 }}
                    >
                        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                    </motion.svg>
                </div>
            </motion.div>
        </Link>
    );
}
