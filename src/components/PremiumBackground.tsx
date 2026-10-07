'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function PremiumBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" style={{ transform: 'translate3d(0, 0, 0)' }}>
            {/* Base Background - Pure Canvas with Ice Tint */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F0F6FA]/40 to-white transition-colors duration-700" />
            
            {/* Primary Ambient Glow - Navy / Royal Blue */}
            <motion.div
                animate={{
                    scale: [1, 1.08, 1],
                    x: [0, 20, 0],
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute -top-[10%] -left-[10%] h-[50vw] w-[50vw] max-w-[650px] max-h-[650px] rounded-full blur-3xl opacity-60"
                style={{
                    background: 'radial-gradient(circle at center, rgba(43, 80, 143, 0.14) 0%, rgba(67, 120, 160, 0.08) 50%, transparent 75%)',
                    willChange: 'transform',
                }}
            />
            
            {/* Secondary Ambient Glow - Ocean Steel */}
            <motion.div
                animate={{
                    scale: [1, 1.12, 1],
                    x: [0, -20, 0],
                    y: [0, 25, 0],
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="absolute top-[20%] -right-[10%] h-[55vw] w-[55vw] max-w-[700px] max-h-[700px] rounded-full blur-3xl opacity-50"
                style={{
                    background: 'radial-gradient(circle at center, rgba(67, 120, 160, 0.12) 0%, rgba(114, 162, 184, 0.07) 50%, transparent 75%)',
                    willChange: 'transform',
                }}
            />

            {/* Tertiary Ambient Glow - Sky Cyan */}
            <motion.div
                animate={{
                    scale: [1, 1.06, 1],
                    x: [0, 15, 0],
                    y: [0, -20, 0],
                }}
                transition={{
                    duration: 16,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 4
                }}
                className="absolute -bottom-[15%] left-[20%] h-[50vw] w-[50vw] max-w-[600px] max-h-[600px] rounded-full blur-3xl opacity-45"
                style={{
                    background: 'radial-gradient(circle at center, rgba(114, 162, 184, 0.12) 0%, rgba(240, 246, 250, 0.2) 60%, transparent 80%)',
                    willChange: 'transform',
                }}
            />

            {/* Subtle Grid - WebKit & cross-browser compatible */}
            <div 
                className="absolute inset-0 bg-[linear-gradient(to_right,#2B508F08_1px,transparent_1px),linear-gradient(to_bottom,#2B508F08_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none"
                style={{
                    WebkitMaskImage: 'radial-gradient(ellipse 70% 55% at 50% 0%, #000 60%, transparent 100%)',
                    maskImage: 'radial-gradient(ellipse 70% 55% at 50% 0%, #000 60%, transparent 100%)',
                }}
            />

            {/* Bottom edge gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/90 to-transparent pointer-events-none" />
        </div>
    );
}
