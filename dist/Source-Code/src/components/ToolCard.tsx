'use client';

import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Tool } from '@/lib/data/tools';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

export function ToolCard({ tool }: { tool: Tool }) {
    const { t } = useLanguage();
    const cardRef = useRef<HTMLDivElement>(null);

    // Motion mouse tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Dynamic 3D Tilt Rotations
    const rotateX = useTransform(springY, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(springX, [-0.5, 0.5], ["-10deg", "10deg"]);

    // Parallax movements for decorations
    const decoTranslateX = useTransform(springX, [-0.5, 0.5], ["-12px", "12px"]);
    const decoTranslateY = useTransform(springY, [-0.5, 0.5], ["-12px", "12px"]);
    
    // Spotlight position (percentage)
    const spotlightX = useTransform(springX, [-0.5, 0.5], ["0%", "100%"]);
    const spotlightY = useTransform(springY, [-0.5, 0.5], ["0%", "100%"]);

    const spotlightBg = useTransform(
        [spotlightX, spotlightY],
        ([x, y]) => `radial-gradient(circle at ${x} ${y}, ${styles.spotlight} 0%, transparent 60%)`
    );

    const dotX = useTransform(springX, [-0.5, 0.5], ["5px", "-5px"]);
    const dotY = useTransform(springY, [-0.5, 0.5], ["5px", "-5px"]);
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

    // Mapping color to classes with Modern Premium Aesthetics
    const colorStyles = {
        amber: {
            bg: 'bg-white',
            border: 'border-zinc-100',
            borderHover: 'group-hover:border-amber-400',
            text: 'text-zinc-900',
            icon: 'text-amber-600 bg-amber-50 shadow-sm border-2 border-amber-200/50',
            badge: 'bg-amber-50 text-amber-900 ring-amber-500/20 shadow-sm',
            shadow: 'shadow-md shadow-zinc-200/30 group-hover:shadow-2xl group-hover:shadow-amber-500/10',
            glow: 'from-amber-400 to-orange-400',
            cornerFlare: 'group-hover:from-amber-400',
            orbital: 'bg-amber-400',
            dotColor: '#f59e0b',
            spotlight: 'rgba(245, 158, 11, 0.08)'
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
            spotlight: 'rgba(16, 185, 129, 0.08)'
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
            spotlight: 'rgba(14, 165, 233, 0.08)'
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
            spotlight: 'rgba(168, 85, 247, 0.08)'
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
            spotlight: 'rgba(244, 63, 94, 0.08)'
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
            spotlight: 'rgba(99, 102, 241, 0.08)'
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
            spotlight: 'rgba(100, 116, 139, 0.08)'
        }
    };

    const styles = colorStyles[tool.color] || colorStyles.slate;

    return (
        <Link 
            href={tool.href} 
            className="block relative group h-full focus:outline-none rounded-3xl"
            style={{ perspective: "1200px" }}
        >
            {/* The Outer Glow Layer - following mouse slightly */}
            <motion.div 
                style={{ x: decoTranslateX, y: decoTranslateY }}
                className={cn(
                    "absolute -inset-1.5 rounded-[2.2rem] opacity-0 group-hover:opacity-15 blur-2xl transition-all duration-700 pointer-events-none",
                    "bg-gradient-to-br",
                    styles.glow
                )} 
            />

            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={cn(
                    "relative flex h-full w-full flex-col gap-4 rounded-3xl border-2 p-5 md:p-6 transition-all duration-500 overflow-hidden bg-white ring-1 ring-black/5",
                    "border-zinc-100",
                    styles.borderHover,
                    styles.shadow,
                )}
            >
                {/* Decoration: Spotlight Mouse Tracking */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                    style={{
                        background: spotlightBg
                    }}
                />

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

                <div className="flex items-center justify-between relative z-10" style={{ transform: "translateZ(30px)" }}>
                    <div className="relative">
                        {/* Icon Orbital Ring */}
                        <div className={cn(
                            "absolute inset-0 rounded-xl blur-md opacity-0 group-hover:opacity-40 transition-all duration-700 animate-pulse",
                            styles.orbital
                        )} />
                        
                        <div className={cn(
                            "relative flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-700 group-hover:scale-110 group-hover:-rotate-6 shadow-md border-2",
                            styles.icon
                        )}>
                            {tool.icon || (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="M2 12h20" /><circle cx="12" cy="12" r="10" /></svg>
                            )}
                        </div>
                    </div>

                    <div className={cn(
                        "rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-widest ring-1 ring-inset shadow-inner transition-all duration-300",
                        styles.badge
                    )}>
                        {t(`tags.${tool.tags[0].replace(/[^a-zA-Z]/g, '').replace(/^\d+/, '').replace(/^./, c => c.toLowerCase())}`) || tool.tags[0]}
                    </div>
                </div>

                <div className="space-y-1.5 relative z-10" style={{ transform: "translateZ(20px)" }}>
                    <h3 className={cn("text-base md:text-lg font-black leading-tight tracking-tight px-1", styles.text)}>
                        {t(`tools.${tool.id}.title`)}
                    </h3>
                    <div className="min-h-[3rem] flex flex-col justify-start px-1">
                        <p className="text-[13px] font-semibold leading-relaxed text-zinc-500/90 group-hover:text-zinc-700 transition-colors duration-300 line-clamp-2">
                            {t(`tools.${tool.id}.description`)}
                        </p>
                    </div>
                </div>

                <div className="mt-auto pt-3 flex items-center justify-between relative z-10" style={{ transform: "translateZ(10px)" }}>
                    <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.1em] text-zinc-400 group-hover:text-zinc-600 transition-colors duration-500 px-1">
                        <span>{t('common.openTool')}</span>
                        <div className="h-[2.5px] w-4 group-hover:w-10 transition-all duration-700 rounded-full bg-zinc-200" />
                    </div>

                    <motion.div
                        className={cn(
                            "p-2 rounded-xl border transition-all duration-500 shadow-sm",
                            "bg-zinc-50 border-zinc-100 text-zinc-400",
                            "group-hover:bg-zinc-900 group-hover:border-zinc-900 group-hover:text-white group-hover:shadow-lg"
                        )}
                        whileHover={{ scale: 1.15, rotate: 12 }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                            className="rtl:rotate-180"
                        >
                            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                        </svg>
                    </motion.div>
                </div>
            </motion.div>
        </Link>
    );
}
