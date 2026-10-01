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
            {/* Mobile Header Bar - Glass Morphism */}
            <div className="relative flex items-center justify-end bg-white/80 backdrop-blur-xl border-b border-zinc-200/50 px-6 py-3.5 shadow-[0_4px_24px_rgba(30,37,94,0.06)] min-h-[66px]">
                {/* Subtle gradient accent on top */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#1E255E] via-[#2B508F] to-[#4378A0] opacity-60" />
                
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3">
                    <div className="relative h-9 w-9">
                        <Image src={APP_CONFIG.logoPath} alt={APP_CONFIG.shortName} fill className="object-contain drop-shadow-md" />
                    </div>
                    <span className="text-base font-black text-zinc-900 tracking-tight bg-clip-text">{APP_CONFIG.shortName}</span>
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-2.5 rounded-2xl text-zinc-600 hover:bg-[#2B508F]/8 hover:text-[#2B508F] transition-all duration-300 relative z-10 active:scale-90"
                    aria-label="Open Navigation Menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="18" x2="20" y2="18" /></svg>
                </button>
            </div>

            {/* Drawer Overlay with Premium Blur */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-[#1E255E]/30 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ x: dir === 'rtl' ? '100%' : '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: dir === 'rtl' ? '100%' : '-100%' }}
                            transition={{ type: "spring", damping: 28, stiffness: 220 }}
                            className={`fixed inset-y-0 ${dir === 'rtl' ? 'right-0 border-l' : 'left-0 border-r'} z-50 w-80 bg-white/98 backdrop-blur-xl shadow-[0_0_80px_rgba(30,37,94,0.15)] border-zinc-100 p-6 overflow-y-auto`}
                        >
                            <div className="flex justify-end mb-4">
                                <motion.button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    whileHover={{ rotate: 90, scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="p-2.5 rounded-2xl hover:bg-rose-50 text-zinc-400 hover:text-rose-500 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                </motion.button>
                            </div>
                            <SidebarContent onItemClick={() => setIsMobileMenuOpen(false)} />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
