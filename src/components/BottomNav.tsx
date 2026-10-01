'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigation } from '@/contexts/NavigationContext';
import { Home, Lightbulb, MessageCircle, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function BottomNav() {
    const pathname = usePathname();
    const { t } = useLanguage();
    const { setIsMobileMenuOpen } = useNavigation();

    const navItems = [
        {
            label: t('common.home'),
            href: '/',
            icon: Home,
            active: pathname === '/'
        },
        {
            label: t('common.tools'),
            href: '/', 
            icon: Lightbulb,
            active: pathname.startsWith('/tools')
        },
        {
            label: t('common.chat'),
            href: '/chat',
            icon: MessageCircle,
            active: pathname === '/chat'
        }
    ];

    return (
        <nav className="md:hidden fixed bottom-3 inset-x-3 z-40 max-w-md mx-auto">
            <div className="rounded-[28px] border border-zinc-200/60 bg-white/90 backdrop-blur-2xl shadow-[0_16px_48px_rgba(30,37,94,0.14),0_4px_12px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.03]">
                {/* Top gradient accent line */}
                <div className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-[#2B508F]/30 to-transparent rounded-full" />
                
                <div className="flex h-16 items-center justify-around px-3 py-1.5">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="group relative flex flex-col items-center justify-center min-w-[60px] py-0.5 transition-all active:scale-90"
                            >
                                <div className={cn(
                                    "relative flex h-10 w-10 items-center justify-center rounded-2xl transition-all duration-300",
                                    item.active 
                                        ? "bg-gradient-to-br from-[#1E255E] to-[#2B508F] text-white shadow-lg shadow-blue-900/25" 
                                        : "text-zinc-500 group-hover:bg-zinc-100/80 group-hover:text-zinc-900"
                                )}>
                                    <Icon
                                        className={cn(
                                            "h-[18px] w-[18px] transition-all duration-300",
                                            item.active && "scale-105"
                                        )}
                                    />
                                    {item.active && (
                                        <motion.div
                                            layoutId="nav-glow"
                                            className="absolute inset-0 rounded-2xl bg-[#2B508F]/15 blur-xl"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </div>
                                <span
                                    className={cn(
                                        "mt-1 text-[9px] font-black uppercase tracking-[0.05em] transition-all duration-300",
                                        item.active ? "text-[#1E255E]" : "text-zinc-400 group-hover:text-zinc-600"
                                    )}
                                >
                                    {item.label}
                                </span>
                                {item.active && (
                                    <motion.div
                                        layoutId="nav-dot"
                                        className="absolute -top-1.5 h-1 w-3 rounded-full bg-gradient-to-r from-[#2B508F] to-[#4378A0]"
                                        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                                    />
                                )}
                            </Link>
                        );
                    })}

                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="group flex flex-col items-center justify-center min-w-[60px] py-0.5 transition-all active:scale-90"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl transition-all duration-300 group-hover:bg-zinc-100/80">
                            <Menu className="h-[18px] w-[18px] text-zinc-500 group-hover:text-zinc-900 transition-colors" />
                        </div>
                        <span className="mt-1 text-[9px] font-black uppercase tracking-[0.05em] text-zinc-400 group-hover:text-zinc-600 transition-colors">
                            {t('common.menu')}
                        </span>
                    </button>
                </div>
            </div>
        </nav>
    );
}
