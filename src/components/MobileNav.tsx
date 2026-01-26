'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SidebarContent } from './SidebarContent';
import { useLanguage } from '@/contexts/LanguageContext';

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const { dir, t } = useLanguage();

    return (
        <div className="md:hidden sticky top-0 z-50">
            {/* Mobile Header Bar */}
            <div className="relative flex items-center justify-end bg-white/80 backdrop-blur-xl border-b border-white/20 px-6 py-4 shadow-sm min-h-[70px]">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3">
                    <img src="/mesk.png" alt={t('common.logoAlt')} className="h-10 w-10 object-contain drop-shadow-sm" />
                    <span className="text-base font-bold text-zinc-900 tracking-tight">{t('sidebar.appName')}</span>
                </div>
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 rounded-xl hover:bg-amber-50 text-zinc-600 transition-colors relative z-10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="18" x2="20" y2="18" /></svg>
                </button>
            </div>

            {/* Drawer Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ x: dir === 'rtl' ? '100%' : '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: dir === 'rtl' ? '100%' : '-100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className={`fixed inset-y-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} z-50 w-80 bg-white/90 backdrop-blur-2xl shadow-2xl border-r border-white/20 p-6 overflow-y-auto`}
                        >
                            <div className="flex justify-end mb-4">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                </button>
                            </div>
                            <SidebarContent />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
