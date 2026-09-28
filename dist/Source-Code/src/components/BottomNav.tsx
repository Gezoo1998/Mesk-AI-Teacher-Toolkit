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
            <div className="rounded-[24px] border border-zinc-200/80 bg-white/95 backdrop-blur-xl shadow-[0_12px_36px_rgba(30,37,94,0.12)] ring-1 ring-black/[0.04]">
                <div className="flex h-15 items-center justify-around px-2 py-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="group relative flex flex-col items-center justify-center min-w-[56px] py-0.5 transition-all active:scale-90"
                            >
                                <div className={cn(
                                    "flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300",
                                    item.active ? "bg-[#2B508F]/10 text-[#2B508F] shadow-inner" : "text-zinc-500 group-hover:bg-zinc-100/60 group-hover:text-zinc-900"
                                )}>
                                    <Icon
                                        className={cn(
                                            "h-4.5 w-4.5 transition-transform duration-300",
                                            item.active && "scale-110"
                                        )}
                                    />
                                </div>
                                <span
                                    className={cn(
                                        "mt-0.5 text-[9px] font-black uppercase tracking-[0.05em] transition-colors duration-300",
                                        item.active ? "text-[#1E255E]" : "text-zinc-400 group-hover:text-zinc-600"
                                    )}
                                >
                                    {item.label}
                                </span>
                                {item.active && (
                                    <motion.div
                                        layoutId="nav-dot"
                                        className="absolute -top-1 h-1 w-2.5 rounded-full bg-[#2B508F] shadow-[0_0_6px_rgba(43,80,143,0.5)]"
                                        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                                    />
                                )}
                            </Link>
                        );
                    })}

                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="group flex flex-col items-center justify-center min-w-[56px] py-0.5 transition-all active:scale-90"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-500 group-hover:bg-zinc-100/50">
                            <Menu className="h-4.5 w-4.5 text-zinc-500 group-hover:text-zinc-900" />
                        </div>
                        <span className="mt-0.5 text-[8px] font-black uppercase tracking-[0.05em] text-zinc-400 group-hover:text-zinc-600">
                            {t('common.menu')}
                        </span>
                    </button>
                </div>
            </div>
        </nav>
    );
}
