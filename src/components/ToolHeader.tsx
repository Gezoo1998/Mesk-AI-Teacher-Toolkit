'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';
import { TOOLS } from '@/lib/data/tools';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import React from 'react';

interface ToolHeaderProps {
    toolId: string;
}

const colorStyles = {
    amber: "bg-amber-500 text-white shadow-amber-500/20 ring-amber-500/20",
    emerald: "bg-emerald-500 text-white shadow-emerald-500/20 ring-emerald-500/20",
    sky: "bg-sky-500 text-white shadow-sky-500/20 ring-sky-500/20",
    purple: "bg-purple-500 text-white shadow-purple-500/20 ring-purple-500/20",
    rose: "bg-rose-500 text-white shadow-rose-500/20 ring-rose-500/20",
    indigo: "bg-indigo-500 text-white shadow-indigo-500/20 ring-indigo-500/20",
    slate: "bg-slate-500 text-white shadow-slate-500/20 ring-slate-500/20",
};

const categoryGradients = {
    planning: "from-emerald-500/5 to-teal-500/5",
    engagement: "from-amber-500/5 to-orange-500/5",
    content: "from-sky-500/5 to-indigo-500/5",
    assessment: "from-rose-500/5 to-purple-500/5",
};

export function ToolHeader({ toolId }: ToolHeaderProps) {
    const { t, language } = useLanguage();
    const tool = TOOLS.find(t => t.id === toolId);
    
    if (!tool) return null;

    const Icon = tool.icon as React.ReactElement;
    const isRtl = language === 'ar';

    const categoryMap = {
        planning: 'dashboard.planningIdeas',
        engagement: 'dashboard.focusEngagement',
        content: 'dashboard.contentCreation',
        assessment: 'dashboard.assessmentFeedback',
    };

    return (
        <div className="relative mb-8 pt-2">
            {/* Ambient Background Accent */}
            <div className={cn(
                "absolute -top-24 -left-24 h-64 w-64 rounded-full blur-[80px] opacity-[0.15] pointer-events-none transition-colors duration-1000",
                tool.color === 'amber' && "bg-amber-400",
                tool.color === 'emerald' && "bg-emerald-400",
                tool.color === 'sky' && "bg-sky-400",
                tool.color === 'purple' && "bg-purple-400",
                tool.color === 'rose' && "bg-rose-400",
                tool.color === 'indigo' && "bg-indigo-400",
                tool.color === 'slate' && "bg-slate-400",
            )} />

            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 mb-6 text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400 relative z-10" dir={isRtl ? 'rtl' : 'ltr'}>
                <Link href="/" className="flex items-center gap-1.5 hover:text-amber-600 transition-colors">
                    <Home size={14} />
                    <span>{t('dashboard.home')}</span>
                </Link>
                <ChevronRight size={12} className={cn("text-zinc-300", isRtl && "rotate-180")} />
                <span className="text-zinc-600">{t(categoryMap[tool.category as keyof typeof categoryMap] || `categories.${tool.category}`)}</span>
                <ChevronRight size={12} className={cn("text-zinc-300 font-bold", isRtl && "rotate-180")} />
                <span className="text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full ring-1 ring-amber-200/50">
                    {t(`tools.${toolId}.title`)}
                </span>
            </nav>

            {/* Main Header Card */}
            <div className="relative group overflow-hidden rounded-[32px] border-2 border-zinc-100 bg-white p-6 md:p-8 shadow-2xl shadow-zinc-200/40">
                {/* Decorative Layer */}
                <div className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-[0.03] pointer-events-none",
                    categoryGradients[tool.category as keyof typeof categoryGradients] || "from-zinc-500/5 to-zinc-600/5"
                )} />
                
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                    {/* Icon Pocket */}
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={cn(
                            "flex h-20 w-20 shrink-0 items-center justify-center rounded-[24px] shadow-lg ring-4 ring-white transition-transform group-hover:scale-105",
                            colorStyles[tool.color || 'slate']
                        )}
                    >
                        {React.isValidElement(Icon) && React.cloneElement(Icon as React.ReactElement<{ size?: number; strokeWidth?: number }>, { size: 40, strokeWidth: 2.5 })}
                    </motion.div>

                    {/* Text Area */}
                    <div className="flex-1 space-y-2">
                        <div className="flex flex-wrap items-center gap-3">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-900 leading-none">
                                {t(`tools.${toolId}.title`)}
                            </h2>
                            <div className={cn(
                                "rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ring-1",
                                tool.color === 'amber' && "bg-amber-50 text-amber-700 ring-amber-200",
                                tool.color === 'emerald' && "bg-emerald-50 text-emerald-700 ring-emerald-200",
                                tool.color === 'sky' && "bg-sky-50 text-sky-700 ring-sky-200",
                                tool.color === 'purple' && "bg-purple-50 text-purple-700 ring-purple-200",
                                tool.color === 'rose' && "bg-rose-50 text-rose-700 ring-rose-200",
                                tool.color === 'indigo' && "bg-indigo-50 text-indigo-700 ring-indigo-200",
                                tool.color === 'slate' && "bg-slate-50 text-slate-700 ring-slate-200",
                            )}>
                                {t(categoryMap[tool.category as keyof typeof categoryMap] || `categories.${tool.category}`)}
                            </div>
                        </div>
                        <p className="text-sm md:text-base font-medium leading-relaxed text-zinc-500 max-w-2xl">
                            {t(`tools.${toolId}.description`)}
                        </p>
                    </div>

                    {/* Decoration: Dot Grid Pockets */}
                    <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none">
                        <div className="grid grid-cols-4 gap-2">
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className="h-1.5 w-1.5 rounded-full bg-zinc-900" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
