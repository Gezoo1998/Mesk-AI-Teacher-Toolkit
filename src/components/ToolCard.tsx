'use client';

import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Tool } from '@/lib/data/tools';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { useRef } from 'react';
import { Star } from 'lucide-react';

// Mapping color to classes with Modern Premium Aesthetics
const colorStyles = {
    amber: {
        bg: 'bg-white',
        border: 'border-zinc-100',
        borderHover: 'group-hover:border-[#2B508F]',
        text: 'text-zinc-900',
        icon: 'text-[#2B508F] bg-blue-50/80 shadow-sm border-2 border-blue-200/50',
        badge: 'bg-blue-50 text-[#1E255E] ring-[#2B508F]/20 shadow-sm',
        shadow: 'shadow-md shadow-zinc-200/30 group-hover:shadow-2xl group-hover:shadow-blue-500/10',
        glow: 'from-[#1E255E] via-[#2B508F] to-[#4378A0]',
        cornerFlare: 'group-hover:from-[#2B508F]',
        orbital: 'bg-[#2B508F]',
        dotColor: '#2B508F',
        spotlight: 'rgba(43, 80, 143, 0.09)'
    },
    emerald: {
        bg: 'bg-white',
        border: 'border-zinc-100',
        borderHover: 'group-hover:border-emerald-400',
        text: 'text-zinc-900',
        icon: 'text-emerald-600 bg-emerald-50 shadow-sm border-2 border-emerald-200/50',
        badge: 'bg-emerald-50 text-emerald-900 ring-emerald-500/20 shadow-sm',
        shadow: 'shadow-md shadow-zinc-200/30 group-hover:shadow-2xl group-hover:shadow-emerald-500/10',
        glow: 'from-emerald-400 to-teal-400',
        cornerFlare: 'group-hover:from-emerald-400',
        orbital: 'bg-emerald-400',
        dotColor: '#10b981',
        spotlight: 'rgba(16, 185, 129, 0.09)'
    },
    sky: {
        bg: 'bg-white',
        border: 'border-zinc-100',
        borderHover: 'group-hover:border-sky-400',
        text: 'text-zinc-900',
        icon: 'text-sky-600 bg-sky-50 shadow-sm border-2 border-sky-200/50',
        badge: 'bg-sky-50 text-sky-900 ring-sky-500/20 shadow-sm',
        shadow: 'shadow-md shadow-zinc-200/30 group-hover:shadow-2xl group-hover:shadow-sky-500/10',
        glow: 'from-sky-400 to-blue-400',
        cornerFlare: 'group-hover:from-sky-400',
        orbital: 'bg-sky-400',
        dotColor: '#0ea5e9',
        spotlight: 'rgba(14, 165, 233, 0.09)'
    },
    purple: {
        bg: 'bg-white',
        border: 'border-zinc-100',
        borderHover: 'group-hover:border-purple-400',
        text: 'text-zinc-900',
        icon: 'text-purple-600 bg-purple-50 shadow-sm border-2 border-purple-200/50',
        badge: 'bg-purple-50 text-purple-900 ring-purple-500/20 shadow-sm',
        shadow: 'shadow-md shadow-zinc-200/30 group-hover:shadow-2xl group-hover:shadow-purple-500/10',
        glow: 'from-purple-400 to-fuchsia-400',
        cornerFlare: 'group-hover:from-purple-400',
        orbital: 'bg-purple-400',
        dotColor: '#a855f7',
        spotlight: 'rgba(168, 85, 247, 0.09)'
    },
    rose: {
        bg: 'bg-white',
        border: 'border-zinc-100',
        borderHover: 'group-hover:border-rose-400',
        text: 'text-zinc-900',
        icon: 'text-rose-600 bg-rose-50 shadow-sm border-2 border-rose-200/50',
        badge: 'bg-rose-50 text-rose-900 ring-rose-500/20 shadow-sm',
        shadow: 'shadow-md shadow-zinc-200/30 group-hover:shadow-2xl group-hover:shadow-rose-500/10',
        glow: 'from-rose-400 to-pink-400',
        cornerFlare: 'group-hover:from-rose-400',
        orbital: 'bg-rose-400',
        dotColor: '#f43f5e',
        spotlight: 'rgba(244, 63, 94, 0.09)'
    },
    indigo: {
        bg: 'bg-white',
        border: 'border-zinc-100',
        borderHover: 'group-hover:border-indigo-400',
        text: 'text-zinc-900',
        icon: 'text-indigo-600 bg-indigo-50 shadow-sm border-2 border-indigo-200/50',
        badge: 'bg-indigo-50 text-indigo-900 ring-indigo-500/20 shadow-sm',
        shadow: 'shadow-md shadow-zinc-200/30 group-hover:shadow-2xl group-hover:shadow-indigo-500/10',
        glow: 'from-indigo-400 to-violet-400',
        cornerFlare: 'group-hover:from-indigo-400',
        orbital: 'bg-indigo-400',
        dotColor: '#6366f1',
        spotlight: 'rgba(99, 102, 241, 0.09)'
    },
    slate: {
        bg: 'bg-white',
        border: 'border-zinc-100',
        borderHover: 'group-hover:border-slate-400',
        text: 'text-zinc-900',
        icon: 'text-slate-600 bg-slate-50 shadow-sm border-2 border-slate-200/50',
        badge: 'bg-slate-50 text-slate-900 ring-slate-500/20 shadow-sm',
        shadow: 'shadow-md shadow-zinc-200/30 group-hover:shadow-2xl group-hover:shadow-slate-500/10',
        glow: 'from-slate-400 to-slate-500',
        cornerFlare: 'group-hover:from-slate-400',
        orbital: 'bg-slate-400',
        dotColor: '#64748b',
        spotlight: 'rgba(100, 116, 139, 0.09)'
    }
};

interface ToolCardProps {
    tool: Tool;
    isFavorite?: boolean;
    onToggleFavorite?: (toolId: string) => void;
}

export function ToolCard({ tool, isFavorite = false, onToggleFavorite }: ToolCardProps) {
    const { t, language } = useLanguage();
    const isRTL = language === 'ar';
    const cardRef = useRef<HTMLDivElement>(null);
    const styles = colorStyles[tool.color] || colorStyles.slate;

    // Motion mouse tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Dynamic 3D Tilt Rotations
    const rotateX = useTransform(springY, [-0.5, 0.5], ["9deg", "-9deg"]);
    const rotateY = useTransform(springX, [-0.5, 0.5], ["-9deg", "9deg"]);

    // Parallax movements for decorations
    const decoTranslateX = useTransform(springX, [-0.5, 0.5], ["-10px", "10px"]);
    const decoTranslateY = useTransform(springY, [-0.5, 0.5], ["-10px", "10px"]);
    
    // Spotlight position (percentage)
    const spotlightX = useTransform(springX, [-0.5, 0.5], ["0%", "100%"]);
    const spotlightY = useTransform(springY, [-0.5, 0.5], ["0%", "100%"]);

    const spotlightBg = useTransform(
        [spotlightX, spotlightY],
        ([x, y]) => `radial-gradient(circle at ${x} ${y}, ${styles.spotlight} 0%, transparent 65%)`
    );

    const dotX = useTransform(springX, [-0.5, 0.5], ["4px", "-4px"]);
    const dotY = useTransform(springY, [-0.5, 0.5], ["4px", "-4px"]);
    const flareX = useTransform(springX, [-0.5, 0.5], ["4px", "-4px"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXRel = (e.clientX - rect.left) / width - 0.5;
        const mouseYRel = (e.clientY - rect.top) / height - 0.5;
        mouseX.set(mouseXRel);
        mouseY.set(mouseYRel);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <Link 
            href={tool.href} 
            className="block relative group h-full focus:outline-none rounded-3xl"
        >
            {/* The Outer Glow Layer - subtle brand highlight */}
            <div 
                className={cn(
                    "absolute -inset-1 rounded-[2.2rem] opacity-0 group-hover:opacity-15 blur-xl transition-all duration-500 pointer-events-none",
                    "bg-gradient-to-br",
                    styles.glow
                )} 
            />

            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={cn(
                    "relative flex h-full w-full flex-col justify-between gap-4 rounded-[26px] border p-5 md:p-6 transition-all duration-300 overflow-hidden bg-white group-hover:-translate-y-1.5",
                    isFavorite 
                        ? "border-amber-300/90 shadow-[0_8px_28px_rgba(245,158,11,0.08)] ring-1 ring-amber-400/20" 
                        : "border-zinc-200/80 shadow-[0_4px_20px_rgba(30,37,94,0.03)] ring-1 ring-black/[0.02]",
                    styles.borderHover,
                    styles.shadow,
                )}
            >
                {/* Decoration: Spotlight Mouse Tracking */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 hidden sm:block"
                    style={{
                        background: spotlightBg
                    }}
                />

                {/* Decoration: Subtle Shimmer Light Sweep on Hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                {/* Decoration: Subtle Dot Grid Section (Parallax) */}
                <motion.div 
                    className="absolute -top-4 -right-4 h-24 w-24 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none"
                    style={{ 
                        backgroundImage: 'radial-gradient(currentColor 1.5px, transparent 1.5px)', 
                        backgroundSize: '10px 10px',
                        color: styles.dotColor,
                        x: dotX,
                        y: dotY,
                    }}
                />

                {/* Decoration: Top Corner Accent Flare (Parallax) */}
                <motion.div 
                    style={{ x: flareX }}
                    className={cn(
                        "absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-transparent via-transparent to-transparent opacity-0 group-hover:opacity-20 transition-all duration-700 pointer-events-none",
                        styles.cornerFlare
                    )} 
                />

                {/* Header Row: Icon + Tag & Interactive Bookmark */}
                <div className="flex items-center justify-between relative z-10" style={{ transform: "translateZ(30px)" }}>
                    <div className="relative">
                        {/* Icon Orbital Ring */}
                        <div className={cn(
                            "absolute inset-0 rounded-2xl blur-md opacity-0 group-hover:opacity-40 transition-all duration-700 animate-pulse",
                            styles.orbital
                        )} />
                        
                        <div className={cn(
                            "relative flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 shadow-sm border",
                            styles.icon
                        )}>
                            {tool.icon || (
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="M2 12h20" /><circle cx="12" cy="12" r="10" /></svg>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className={cn(
                            "rounded-xl px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ring-1 ring-inset shadow-2xs transition-all duration-300",
                            styles.badge
                        )}>
                            {t(`tags.${tool.tags[0].replace(/[^a-zA-Z]/g, '').replace(/^\d+/, '').replace(/^./, c => c.toLowerCase())}`) || tool.tags[0]}
                        </div>

                        {/* Interactive Favorite Star Button */}
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onToggleFavorite?.(tool.id);
                            }}
                            title={isFavorite ? (isRTL ? "إزالة من المفضلة" : "Remove from favorites") : (isRTL ? "إضافة إلى المفضلة" : "Add to favorites")}
                            className={cn(
                                "flex h-8 w-8 items-center justify-center rounded-xl border transition-all duration-300 active:scale-90",
                                isFavorite
                                    ? "bg-amber-50 border-amber-300 text-amber-500 shadow-xs shadow-amber-500/20 opacity-100 scale-100"
                                    : "bg-zinc-50/80 border-zinc-200/80 text-zinc-400 hover:text-amber-500 hover:bg-amber-50/80 hover:border-amber-200 opacity-80 sm:opacity-0 group-hover:opacity-100"
                            )}
                        >
                            <Star className={cn("w-4 h-4 transition-transform", isFavorite && "fill-amber-400 text-amber-500 scale-110")} />
                        </button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="space-y-1.5 relative z-10 flex-1 flex flex-col justify-start" style={{ transform: "translateZ(20px)" }}>
                    <h3 className={cn("text-base md:text-[17px] font-black leading-snug tracking-tight text-zinc-900 group-hover:text-[#1E255E] transition-colors duration-300 px-0.5", styles.text)}>
                        {t(`tools.${tool.id}.title`)}
                    </h3>
                    <div className="min-h-[2.85rem] flex flex-col justify-start px-0.5">
                        <p className="text-[13px] font-medium leading-relaxed text-zinc-500/90 group-hover:text-zinc-700 transition-colors duration-300 line-clamp-2">
                            {t(`tools.${tool.id}.description`)}
                        </p>
                    </div>
                </div>

                {/* Footer Action Row */}
                <div className="pt-2 flex items-center justify-between border-t border-zinc-100 relative z-10" style={{ transform: "translateZ(10px)" }}>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-zinc-400 group-hover:text-[#2B508F] transition-colors duration-300 px-0.5">
                        <span>{t('common.openTool')}</span>
                        <div className="h-[2px] w-4 group-hover:w-8 transition-all duration-500 rounded-full bg-zinc-200 group-hover:bg-[#2B508F]/50" />
                    </div>

                    <motion.div
                        className={cn(
                            "h-8 w-8 rounded-xl border transition-all duration-300 shadow-2xs flex items-center justify-center shrink-0",
                            "bg-zinc-50/80 border-zinc-200/70 text-zinc-400",
                            "group-hover:bg-[#2B508F] group-hover:border-[#2B508F] group-hover:text-white group-hover:shadow-md group-hover:shadow-blue-900/20"
                        )}
                        whileHover={{ scale: 1.1, rotate: isRTL ? -8 : 8 }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                            className="rtl:rotate-180"
                        >
                            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                        </svg>
                    </motion.div>
                </div>
            </div>
        </Link>
    );
}
