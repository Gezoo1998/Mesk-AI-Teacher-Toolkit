'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { SidebarContent } from './SidebarContent';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigation } from '@/contexts/NavigationContext';
import Image from 'next/image';
import { APP_CONFIG } from '@/config/app';

export function MobileNav() {
    const { isMobileMenuOpen, setIsMobileMenuOpen } = useNavigation();
    const { dir } = useLanguage();

    return (
        <div className="md:hidden sticky top-0 z-50">
            {/* Mobile Header Bar */}
            <div className="relative flex items-center justify-end bg-white border-b border-zinc-200 px-6 py-4 shadow-md min-h-[70px]">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3">
                    <div className="relative h-10 w-10">
                        <Image src={APP_CONFIG.logoPath} alt={APP_CONFIG.shortName} fill className="object-contain drop-shadow-sm" />
                    </div>
                    <span className="text-base font-bold text-zinc-900 tracking-tight">{APP_CONFIG.shortName}</span>
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-2 rounded-xl hover:bg-amber-50 text-zinc-600 transition-colors relative z-10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="18" x2="20" y2="18" /></svg>
                </button>
            </div>

            {/* Drawer Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/40 z-50"
                        />
                        <motion.div
                            initial={{ x: dir === 'rtl' ? '100%' : '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: dir === 'rtl' ? '100%' : '-100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className={`fixed inset-y-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} z-50 w-80 bg-white shadow-2xl border-r border-zinc-100 p-6 overflow-y-auto`}
                        >
                            <div className="flex justify-end mb-4">
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                </button>
                            </div>
                            <SidebarContent onItemClick={() => setIsMobileMenuOpen(false)} />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
