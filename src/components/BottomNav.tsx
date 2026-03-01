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
            href: '/', // On mobile, maybe it should just go home or scroll? Home is the dashboard.
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
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 pt-2">
            <div className="mx-auto max-w-lg rounded-3xl border border-white/30 bg-white/60 shadow-2xl backdrop-blur-2xl ring-1 ring-black/5">
                <div className="flex h-16 items-center justify-around px-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="group relative flex flex-col items-center justify-center min-w-[64px] py-1 transition-all active:scale-90"
                            >
                                <div className={cn(
                                    "flex h-10 w-10 items-center justify-center rounded-2xl transition-all duration-500",
                                    item.active ? "bg-amber-500/10 shadow-inner" : "group-hover:bg-zinc-100/50"
                                )}>
                                    <Icon
                                        className={cn(
                                            "h-5 w-5 transition-all duration-300",
                                            item.active ? "text-amber-600 scale-110" : "text-zinc-500 group-hover:text-zinc-900"
                                        )}
                                    />
                                </div>
                                <span
                                    className={cn(
                                        "mt-1 text-[9px] font-black uppercase tracking-[0.1em] transition-colors duration-300",
                                        item.active ? "text-amber-700" : "text-zinc-400 group-hover:text-zinc-600"
                                    )}
                                >
                                    {item.label}
                                </span>
                                {item.active && (
                                    <motion.div
                                        layoutId="nav-dot"
                                        className="absolute -top-1 h-1 w-1 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </Link>
                        );
                    })}

                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="group flex flex-col items-center justify-center min-w-[64px] py-1 transition-all active:scale-90"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl transition-all duration-500 group-hover:bg-zinc-100/50">
                            <Menu className="h-5 w-5 text-zinc-500 group-hover:text-zinc-900" />
                        </div>
                        <span className="mt-1 text-[9px] font-black uppercase tracking-[0.1em] text-zinc-400 group-hover:text-zinc-600">
                            {t('common.menu')}
                        </span>
                    </button>
                </div>
            </div>
        </nav>
    );
}
